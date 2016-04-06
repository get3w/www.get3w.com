import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'
import OrgList from "../../components/orgList"
import BJWLSDY from "../../components/partymembers/bjwlsdy/form"
import XINZENG from "../../components/partymembers/xinzeng/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  flowUsers: Array<models.FlowUser>
  winType: string
  id: number
  name: string
  isStartDate: boolean
  isEndDate: boolean
  startDate: string
  endDate: string
  comeFrom: string
  isChildren: boolean
  currentOrg: models.Org
  controls: { [index: string]: boolean }
}

class PartyMembersLDPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      flowUsers: null,
      winType: '',
      id: null,
      name: null,
      isStartDate: null,
      isEndDate: null,
      startDate: null,
      endDate: null,
      comeFrom: null,
      isChildren: false,
      currentOrg: props.orgState.org,
      controls: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org)
  }

  componentDidMount() {
    this.load(this.props.orgState.org)
  }

  load(currentOrg: models.Org) {
    this.state.currentOrg = currentOrg
    let comefromValue = this.state.comeFrom;
    if(comefromValue === '全部'){
       comefromValue = '';
    }
    utils.DOM.loading(true)
    client.flowUsers.search(true, currentOrg.id, this.state.name || '', this.state.startDate || '', this.state.endDate || '', comefromValue || '', this.state.isChildren, (err: models.Error, res: Array<models.FlowUser>) => {
      utils.DOM.loading(false)
      this.state.flowUsers = res
      this.setState(this.state)
    })
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  onClose(e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
  }

  onCalendarSelect(name: string, date: Date, e) {
    const dateStr = utils.Translate.toShortDate(date)
    this.state.isStartDate = this.state.isEndDate = false
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onClick(name: string, e) {
    if (name === 'comeFrom') {
      this.state.controls[name] = !this.state.controls[name]
    }
    else {
      this.state[name] = !this.state[name]
    }
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }
  onValueChange(name: string, value: string, e) {
    this.state.comeFrom = value
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org)
  }

  render() {
    if (!this.state.flowUsers) return <InnerLoading />
    const isOp = this.props.orgState.isOp

    let addBtnEl = null
    if (isOp) {
      addBtnEl = <a onClick={this.onEdit.bind(this, constants.WinTypes.PARTY_MEMBERS_XINZENG) } href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
    }

    const listEl = this.state.flowUsers.map((flowUser: models.FlowUser) => {
      let opEl = null
      if (isOp) {
        opEl = (
          <div className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.PARTY_MEMBERS_BJWLSDY, flowUser.id) } className="m2fm_abtn" href="javascript:;">标记为历史党员</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.PARTY_MEMBERS_XINZENG, flowUser.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
          </div>
        )
      }
      return (
        <tr key={flowUser.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td>{flowUser.name}</td>
          <td>{flowUser.sex}</td>
          <td>{flowUser.orgName}</td>
          <td>{flowUser.comeFrom}</td>
          <td>{utils.Translate.toShortDate(flowUser.flowDate) }</td>
          <td>{utils.Translate.toShortDate(flowUser.partyDate) }</td>
          <td>{flowUser.mobile}</td>
          <td>
            {opEl}
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let flowUser = null
      this.state.flowUsers.forEach((fu: models.FlowUser) => {
        if (this.state.id === fu.id) {
          flowUser = fu
        }
      })
      if (this.state.winType === constants.WinTypes.PARTY_MEMBERS_BJWLSDY) {
        formEl = <BJWLSDY flowUser={flowUser} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.PARTY_MEMBERS_XINZENG) {
        formEl = <XINZENG flowUser={flowUser} org={this.props.orgState.org} onClose={this.onClose.bind(this) } />
      }
    }

    let startDateEl = null
    let endDateEl = null
    if (this.state.isStartDate) {
      startDateEl = (
        <div style={{ position: "absolute", left: "35%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startDate") } />
        </div>
      )
    }
    if (this.state.isEndDate) {
      endDateEl = (
        <div style={{ position: "absolute", left: "45%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endDate") } />
        </div>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" value={this.state.name} onChange={this.onChange.bind(this, 'name') } className="m2fm_int m2fm_int6" style={{width: "60px"}} />
          <span className="m2fm_ss1">流入日期：</span>
          <input value={this.state.startDate} onClick={this.onClick.bind(this, "isStartDate") } style={{ width: "104px" }} className="m2fm_int m2fm_int2" type="text" />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.endDate} onClick={this.onClick.bind(this, "isEndDate") }  style={{ width: "104px" }}className="m2fm_int m2fm_int2" type="text" />
          {endDateEl}
          <span style={{ position: "relative" }}>
            <span className="m2fm_ss1">流动地域：</span>
            <input value={this.state.comeFrom}  onClick={this.onClick.bind(this, "comeFrom") } type="text" name="" className="m2fm_int m2fm_int3" placeholder="全部" style={{width: "50px"}} />
            <div className="m2fm_selBox" style={{ position: "absolute", left: "-160px", width: 160, display: this.state.controls["comeFrom"] ? "block" : "none " }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, "comeFrom", "全部") }>全部</dd>
                <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨省") }>跨省</dd>
                <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨市") }>跨市</dd>
                <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨地") }>跨地</dd>
              </dl>
            </div>
          </span>
          <span className="m2fm_ss1">
            <input onChange={() => {
              this.state.isChildren = !this.state.isChildren
              this.setState(this.state)
            }} checked={this.state.isChildren} className="lay-rad" name="" type="checkbox" value="" /> 包含下级
          </span>
          <input onClick={this.onSearch.bind(this) } type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan={7}>
                  <OrgList org={this.props.orgState.org} onOrgSelect={(currentOrg: models.Org) => {
                    this.load(currentOrg)
                  } } />
                </td>
                <td colSpan={2} style={{ textAlign: "right" }}>
                  {addBtnEl}
                  <img src="/assets/images/m2btn2.jpg" width="76" height="32" style={{ marginLeft: "10px" }} />
                </td>
              </tr>
              <tr className="m2th">
                <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
                <td>姓名</td>
                <td>性别</td>
                <td>登记党支部</td>
                <td>流出地</td>
                <td>流入日期</td>
                <td>入党日期</td>
                <td>手机</td>
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
)(PartyMembersLDPage);
