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
import * as states from '../../constants/states'
import * as constants from '../../constants'
import LWJJFZ from "../../components/members/lwjjfz/form"
import ZHUANCHU from "../../components/members/zhuanchu/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  users: Array<models.User>
  winType: string
  id: number
  searchKeyword: string
  isSearchFrom: boolean
  isSearchTo: boolean
  searchFrom: string
  searchTo: string
}

class MembersSQPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      winType: '',
      id: null,
      searchKeyword: '',
      isSearchFrom: false,
      isSearchTo: false,
      searchFrom: '',
      searchTo: ''
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {

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

  onCalendarSelect(name: string, value: Date, e) {
    const dateStr = utils.Translate.toShortDate(value)
    this.state.isSearchFrom = this.state.isSearchTo = false
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onClick(name: string, e) {
    this.state[name] = !this.state[name]
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org.id)
  }

  getListEl(isOp: boolean) {
    return this.state.users.map((user: models.User) => {
      let opEl = null
      if (isOp) {
        opEl = (
          <div>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_ZHUANCHU, user.id)} className="m2fm_abtn" href="javascript:;">转出</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWJJFZ, user.id)} className="m2fm_abtn" href="javascript:;">列为积极分子</a>
            <Link className="m2fm_abtn" to={'/users/' + user.userName + '/jbxx?returnUrl=' + encodeURIComponent(constants.Links.MEMBERS_SQ)}>编辑</Link>
          </div>
        )
      }
      return (
        <tr key={user.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><a href={"/users/" + user.userName} target="_blank" className="cor_red">{user.displayName}</a></td>
          <td>{user.sex}</td>
          <td>{user.orgName}</td>
          <td>{utils.Translate.toShortDate(user.applyPartyDate)}</td>
          <td>{user.thoughtReportCount}</td>
          <td>{user.mobile}</td>
          <td>{opEl}</td>
        </tr>
      )
    })
  }

  render() {
    if (!this.state.users) return <InnerLoading />

    const isOp = this.props.orgState.isOp
    const listEl = this.getListEl(isOp)
    let addBtnEl = null
    if (isOp) {
      addBtnEl = <Link to={constants.Links.MEMBERS_ADD + "?userType=" + encodeURIComponent('申请人')} className="m2addBtn"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></Link>
    }

    let formEl = null
    if (this.state.winType) {
      let user = null
      this.state.users.forEach((m: models.User) => {
      })
      if (this.state.winType === constants.WinTypes.MEMBERS_LWJJFZ) {
        formEl = <LWJJFZ user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_ZHUANCHU) {
        formEl = <ZHUANCHU user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} onSuccess={this.load.bind(this, this.props.orgState.org.id)} />
      }
    }

    let searchFromEl = null
    let searchToEl = null
    if (this.state.isSearchFrom) {
      searchFromEl = (
        <div style={{position: "absolute", left: "35%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchFrom")} />
        </div>
      )
    }
    if (this.state.isSearchTo) {
      searchToEl = (
        <div style={{position: "absolute", left: "45%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchTo")} />
        </div>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" value={this.state.searchKeyword} onChange={this.onChange.bind(this, 'searchKeyword')} className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">申请入党日期：</span>
          <input value={this.state.searchFrom} onClick={this.onClick.bind(this,"isSearchFrom")} onChange={this.onChange.bind(this, "isSearchFrom")} style={{width: "130px"}} className="m2fm_int m2fm_int2" type="text" />
          {searchFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.searchTo} onClick={this.onClick.bind(this,"isSearchTo")} onChange={this.onChange.bind(this, "isSearchTo")} style={{width: "130px"}} className="m2fm_int m2fm_int2" type="text" />
          {searchToEl}
          <input onClick={this.onSearch.bind(this)} type="submit" className="m2submit" value="" />
          {addBtnEl}
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
            <tr className="m2th">
              <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td width="9%">姓名</td>
              <td width="9%">性别</td>
              <td width="16%">所属组织</td>
              <td width="13%">申请入党日期</td>
              <td width="13%">思想汇报份数</td>
              <td width="13%">手机</td>
              <td width="23%">操作</td>
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
)(MembersSQPage);
