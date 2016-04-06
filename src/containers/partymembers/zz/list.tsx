import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import * as actions from '../../../actions/authActions';
import * as states from '../../../constants/states'
import * as constants from '../../../constants'
import OrgList from "../../../components/orgList"
import TONGYI from "../../../components/users/zhuanchu_add/form"

interface P {
  isZhuanChu: boolean
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  ots: Array<models.OrgTransfer>
  winType: string
  id: number
  controls: {[index: string]: boolean}
  displayName: string
  targetOrgName: string
  applyState: string
  applyDateFrom: string
  applyDateTo: string
  isChildren: boolean
  currentOrg: models.Org
}

class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ots: null,
      winType: '',
      id: null,
      controls: {},
      displayName: null,
      targetOrgName: null,
      applyState: null,
      applyDateFrom: null,
      applyDateTo: null,
      isChildren: false,
      currentOrg: props.orgState.org,
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org, nextProps.isZhuanChu)
  }

  componentDidMount() {
    this.load(this.props.orgState.org, this.props.isZhuanChu)
  }

  load(currentOrg: models.Org, isZhuanChu: boolean) {
    this.state.currentOrg = currentOrg
    const sourceOrgID = isZhuanChu ? currentOrg.id : 0
    const targetOrgID = isZhuanChu ? 0 : currentOrg.id
    utils.DOM.loading(true)
    client.orgTransfers.search(sourceOrgID, targetOrgID, this.state.displayName || '', this.state.targetOrgName || '', this.state.applyState || '', '', this.state.applyDateFrom || '', this.state.applyDateTo || '', this.state.isChildren, (err: models.Error, res: Array<models.OrgTransfer>) => {
      utils.DOM.loading(false)
      this.state.ots = res
      this.setState(this.state)
    })
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  onClose(isReload: boolean, e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
    if (isReload) {
      this.load(this.props.orgState.org, this.props.isZhuanChu)
    }
  }

  onCalendarSelect(name: string, date: Date, e) {
    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = !this.state.controls[name]
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org, this.props.isZhuanChu)
  }

  isException(ot?: models.OrgTransfer): boolean {
    const org = this.props.orgState.org
    if (this.props.isZhuanChu) {
      if (ot) {
        if (ot.applyState === '党支部审核通过' && org.orgType === '党总支') {
          return true
        } else if (ot.applyState === '党总支审核通过' && (org.orgType === '地方党委' || org.orgType === '直属党委')) {
          return true
        }
      }
    }
    else {
      if (org.orgType === '地方党委' || org.orgType === '直属党委') {
        return true
      }
    }

    return false
  }

  onValueChange(name: string, value: string, e) {
    this.state[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  render() {
    if (!this.state.ots) return <InnerLoading />
    let isOp = this.props.orgState.isOp
    if (this.isException()) {
      isOp = true
    }
    const org = this.props.orgState.org

    const listEl = this.state.ots.map((ot: models.OrgTransfer) => {
      let opEl = null
      let isOtOp = this.props.orgState.isOp
      //提出申请、党支部审核通过、党总支审核通过、党委审核通过、转接完成
      if (this.isException(ot)) {
        isOtOp = true
      }
      if (isOtOp) {
        let isOk = false
        if (ot.applyState === '提出申请') {
          if (org.orgType === '党支部') {
            isOk = true
          }
        } else if (ot.applyState === '党支部审核通过') {
          if (org.orgType === '党总支' || org.orgType === '地方党委' || org.orgType === '直属党委') {
            isOk = true
          }
        } else if (ot.applyState === '党总支审核通过') {
          if (org.orgType === '地方党委' || org.orgType === '直属党委') {
            isOk = true
          }
        } else if (ot.applyState === '党委审核通过') {
          if (org.id === ot.targetOrgID) {
            isOk = true
          }
        }
        if (isOk) {
          opEl = (
            <div className="center">
              <a onClick={this.onEdit.bind(this, constants.WinTypes.PARTY_MEMBERS_TONGYI, ot.id)} className="m2fm_abtn" href="javascript:;">编辑</a>
            </div>
          )
        }
      }
      return (
        <tr key={ot.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><a href={"/users/" + ot.userName} target="_blank" className="cor_red">{ot.displayName}</a></td>
          <td>{ot.targetOrgName}</td>
          <td>{ot.transferType}</td>
          <td>{utils.Translate.toShortDate(ot.partyDuesDate)}</td>
          <td>{utils.Translate.toShortDate(ot.applyDate)}</td>
          <td style={{display: this.props.isZhuanChu ? "block" : "none"}}>{ot.applyState}</td>
          <td>
            {opEl}
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let ot: models.OrgTransfer = null
      this.state.ots.forEach((m: models.OrgTransfer) => {
        if (this.state.id === m.id) {
          ot = m
        }
      })
      if (this.state.winType === constants.WinTypes.PARTY_MEMBERS_TONGYI) {
        formEl = <TONGYI isZhuanChu={this.props.isZhuanChu} isOp={true} user={null} org={this.props.orgState.org} ot={ot} onClose={this.onClose.bind(this) } />
      }
    }

    let applyDateFromEl = null
    let applyDateToEl = null
    if (this.state.controls['applyDateFrom']) {
      applyDateFromEl = (
        <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "applyDateFrom")} />
        </div>
      )
    }
    if (this.state.controls['applyDateTo']) {
      applyDateToEl = (
        <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "applyDateTo")} />
        </div>
      )
    }

    let appStateEl = null
    if (this.props.isZhuanChu) {
      appStateEl = (
        <span style={{ position: "relative" }}>
          <span className="m2fm_ss1">状态：</span>
          <input onClick={this.onClick.bind(this, "applyState") } value={this.state.applyState} type="text" name="" className="m2fm_int m2fm_int3" style={{width: "55px"}} />
          <div className="m2fm_selBox" style={{ position: "absolute", left: "-124px", display: this.state.controls['applyState'] ? "block" : "none" }}>
            <dl>
              <dd onClick={this.onValueChange.bind(this, "applyState", "提出申请") }>提出申请</dd>
              <dd onClick={this.onValueChange.bind(this, "applyState", "党支部审核通过") }>党支部审核通过</dd>
              <dd onClick={this.onValueChange.bind(this, "applyState", "党总支审核通过") }>党总支审核通过</dd>
              <dd onClick={this.onValueChange.bind(this, "applyState", "党委审核通过") }>党委审核通过</dd>
              <dd onClick={this.onValueChange.bind(this, "applyState", "转接完成") }>转接完成</dd>
            </dl>
          </div>
        </span>
      )
    }

    let addBtnEl = null
    if (!this.props.isZhuanChu && isOp) {
      addBtnEl = <Link to={constants.Links.PARTY_MEMBERS_ADD + "?userType=" + encodeURIComponent('党员')}><img src="/assets/images/m2btn.jpg" width="76" height="32" /></Link>
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input value={this.state.displayName} onChange={this.onChange.bind(this, 'displayName')} type="text" name="" className="m2fm_int m2fm_int6" style={{width: "55px"}} />
          <span className="m2fm_ss1">目标组织：</span>
          <input value={this.state.targetOrgName} onChange={this.onChange.bind(this, 'targetOrgName')} type="text" name="" className="m2fm_int m2fm_int6" style={{width: "55px"}} />
          {appStateEl}
          <span className="m2fm_ss1">申请时间：</span>
          <input value={this.state.applyDateFrom} onClick={this.onClick.bind(this,"applyDateFrom")} type="text" name="" className="m2fm_int m2fm_int6" style={{ width: "55px" }} />
          {applyDateFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.applyDateTo} onClick={this.onClick.bind(this,"applyDateTo")} type="text" name="" className="m2fm_int m2fm_int6" style={{ width: "55px" }} />
          {applyDateToEl}
          <span className="m2fm_ss1">
            <input onChange={() => {
              this.state.isChildren = !this.state.isChildren
              this.setState(this.state)
            }} checked={this.state.isChildren} className="lay-rad" name="" type="checkbox" value="" /> 包含下级
          </span>
          <input onClick={this.onSearch.bind(this)} type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan={5} style={{ textAlign: "right" }}>
                  <OrgList org={this.props.orgState.org} onOrgSelect={(currentOrg: models.Org) => {
                  this.load(currentOrg, this.props.isZhuanChu)
                } } />
                </td>
                <td colSpan={3}>
                  {addBtnEl}
                  <img src="/assets/images/m2btn2.jpg" width="76" height="32" style={{ marginLeft: "10px" }} />
                </td>
              </tr>
              <tr className="m2th">
                <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
                <td>姓名</td>
                <td>目标组织</td>
                <td>转接类型</td>
                <td>党费交至时间</td>
                <td>申请日期</td>
                <td style={{display: this.props.isZhuanChu ? "block" : "none"}}>处理状态</td>
                <td width="18%">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

export default connect(
  mapStateToProps
)(List);
