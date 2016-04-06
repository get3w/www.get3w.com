import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as constants from '../../constants';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as actions from '../../actions/authActions';
import ADD from "../../components/orgs/add/form"
import VIEW from "../../components/orgs/view/form"
import SHOUQUAN from "../../components/orgs/shouquan/form"
import Confirm from "../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  orgs: Array<models.Org>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  orgName: string
  isCancel: string
  orgType: string
}

class OrgGLPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgs: null,
      winType: '',
      id: null,
      controls: {},
      orgName: null,
      isCancel: null,
      orgType: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    if (this.state.orgName ||
      this.state.isCancel ||
      this.state.orgType) {
      utils.DOM.loading(true)
      client.orgs.search(orgID, this.state.orgName, this.state.isCancel, this.state.orgType,"false", (err: models.Error, res: Array<models.Org>) => {
        utils.DOM.loading(false)
        this.state.orgs = res
        this.setState(this.state)
      })
    } else {
      client.orgs.list(orgID, false, (err: models.Error, res: Array<models.Org>) => {
        this.state.orgs = res
        this.setState(this.state)
      })
    }
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
      this.load(this.props.orgState.org.id)
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

  onValueChange(name: string, value: string, e) {
    this.state[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org.id)
  }

  onDelete(id, e) {
    client.orgs.delete(id, () => {
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.orgs) return <InnerLoading />
    const isOp = this.props.orgState.isAdmin && this.props.orgState.org.orgType !== '党支部'

    const listEl = this.state.orgs.map((org: models.Org) => {
      let opEl = null
      if (isOp && !org.isCancel) {
        opEl = (
          <div className="center">
            <a className="m2fm_abtn" onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_SHOUQUAN, org.id) } href="javascript:;">授权</a>
            <a className="m2fm_abtn" onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM, org.id) } href="javascript:;">删除</a>
            <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_ADD, org.id) }>编辑</a>
          </div>
        )
      }
      else {
        opEl = (
          <div className="center">
            <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_VIEW, org.id) }>查看</a>
          </div>
        )
      }
      return (
        <tr>
          <td><span className="cor_red">{org.orgName}</span></td>
          <td>{org.orgType}</td>
          <td>{org.isCancel ? "无效" : "有效"}</td>
          <td>
            {opEl}
          </td>
        </tr>
      )
    })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="#" className="m2fmPage_a">＜</a>
    //     <a href="#" className="m2fmPage_a on">1</a>
    //     <a href="#" className="m2fmPage_a">2</a>
    //     <a href="#" className="m2fmPage_a">3</a>
    //     <a href="#" className="m2fmPage_a">4</a>
    //     <a href="#" className="m2fmPage_a">5</a>
    //     <a href="#" className="m2fmPage_a">6</a>
    //     <a href="#" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="#" className="m2fmPage_a">99</a>
    //     <a href="#" className="m2fmPage_a">100</a>
    //     <a href="#" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    let formEl = null
    if (this.state.winType) {
      let org = null
      this.state.orgs.forEach((o: models.Org) => {
        if (this.state.id === o.id) {
          org = o
        }
      })

      if (this.state.winType === constants.WinTypes.ORGS_ADD) {
        formEl = <ADD org={org} parentOrg={this.props.orgState.org} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.ORGS_SHOUQUAN) {
        formEl = <SHOUQUAN org={org} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除组织 " + org.orgName} onSubmit={this.onDelete.bind(this, org.id) } onClose={this.onClose.bind(this) } />
      }else if (this.state.winType === constants.WinTypes.ORGS_VIEW) {
        formEl = <VIEW org={org} parentOrg={this.props.orgState.org} onClose={this.onClose.bind(this) } />
      }
    }

    let addBtnEl = null
    if (isOp) {
      addBtnEl = (
        <a href="javascript:;" onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_ADD, 0) } className="m2addBtn">
          <img src="/assets/images/m2btn.jpg" width="76" height="32" />
        </a>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">组织名称：</span>
          <input value={this.state.orgName} onChange={this.onChange.bind(this, 'orgName') } type="text" name="" className="m2fm_int m2fm_int8" />
          <span className="m2fm_ss1">是否有效：</span>
          <div className="m2fm_selContent">
            <input onClick={this.onClick.bind(this, "isCancel") } value={this.state.isCancel === 'True' ? "无效" : "有效"} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="全部" />
            <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", top: "30px", left: "0", display: this.state.controls["isCancel"] ? "block" : "none" }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, "isCancel", "False") }>有效</dd>
                <dd onClick={this.onValueChange.bind(this, "isCancel", "True") }>无效</dd>
              </dl>
            </div>
          </div>
          <span className="m2fm_ss1">组织类型：</span>
          <div className="m2fm_selContent">
            <input onClick={this.onClick.bind(this, "orgType") } value={this.state.orgType} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="全部" />
            <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", top: "30px", left: "0", display: this.state.controls["orgType"] ? "block" : "none" }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, "orgType", "") }>全部</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "集团党组") }>集团党组</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "地方党组") }>地方党组</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "直属党委") }>直属党委</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "地方党委") }>地方党委</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "党总支") }>党总支</dd>
                <dd onClick={this.onValueChange.bind(this, "orgType", "党支部") }>党支部</dd>
              </dl>
            </div>
          </div>
          <input onClick={this.onSearch.bind(this) } type="submit" name="" className="m2submit" value="" />
          {addBtnEl}
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2pdTab">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="33%">组织名称</td>
                <td width="25%">组织类型 </td>
                <td width="24%">是否有效</td>
                <td width="18%">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
          {pager}
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
)(OrgGLPage);
