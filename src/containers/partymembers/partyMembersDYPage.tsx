import * as is from 'is_js'
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
import BIANDONG from "../../components/partymembers/biandong/form"

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
  isChildren: boolean
  currentOrg: models.Org
  pages: {[index: string]: string}
  errors: { [index: string]: boolean }
}

class PartyMemberDYPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      users: null,
      winType: '',
      id: null,
      searchKeyword: '',
      isSearchFrom: false,
      isSearchTo: false,
      searchFrom: '',
      searchTo: '',
      isChildren: false,
      currentOrg: props.orgState.org,
      pages: {},
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org, '')
  }

  componentDidMount() {
    this.load(this.props.orgState.org, '')
  }

  load(currentOrg: models.Org, pageUrl: string) {
    this.state.currentOrg = currentOrg
    utils.DOM.loading(true)

  }

  onPageClick(isNext: boolean) {
    if (isNext) {
      this.load(this.state.currentOrg, this.state.pages['next'])
    } else {
      this.load(this.state.currentOrg, this.state.pages['previous'])
    }
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
    let errors = {}
    
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }
    this.load(this.state.currentOrg, '')
  }

  render() {
    if (!this.state.users) return <InnerLoading />
    const isOp = this.props.orgState.isOp

    const listEl = this.state.users.map((user: models.User) => {
      let opEl = null
      if (isOp) {
        opEl = (
          <div className="center">
            <Link className="m2fm_abtn" to={'/users/' + user.userName + '/jbxx?returnUrl=' + encodeURIComponent(constants.Links.PARTY_MEMBERS_DY) }>编辑</Link>
            <a className="m2fm_abtn" onClick={this.onEdit.bind(this, constants.WinTypes.PARTY_MEMBERS_BIANDONG, user.id) } href="javascript:;">变动</a>
          </div>
        )
      }
      return (
        <tr key={user.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><a href={"/users/" + user.userName} target="_blank" className="cor_red">{user.displayName}</a></td>
          <td>{user.sex}</td>
          <td>{user.orgName}</td>
          <td>{utils.Translate.toShortDate(user.partyDate) }</td>
          <td>{user.mobile}</td>
          <td>
            {opEl}
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let user = null
      if (this.state.winType === constants.WinTypes.PARTY_MEMBERS_BIANDONG) {
        formEl = <BIANDONG user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this) } />
      }
    }

    let searchFromEl = null
    let searchToEl = null
    if (this.state.isSearchFrom) {
      searchFromEl = (
        <div style={{ position: "absolute", left: "35%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchFrom") } />
        </div>
      )
    }
    if (this.state.isSearchTo) {
      searchToEl = (
        <div style={{ position: "absolute", left: "45%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchTo") } />
        </div>
      )
    }

    let pager = null
    if (this.state.pages['previous'] && this.state.pages['next']) {
      pager = (
        <div className="m2fm_page">
          <a onClick={this.onPageClick.bind(this, false)} href="javascript:;" className="m2fmPage_a on">上一页</a>
          <a onClick={this.onPageClick.bind(this, true)} href="javascript:;" className="m2fmPage_a on">下一页</a>
        </div>
      )
    } else if (this.state.pages['previous']) {
      pager = (
        <div className="m2fm_page">
          <a onClick={this.onPageClick.bind(this, false)} href="javascript:;" className="m2fmPage_a on">上一页</a>
          <span className="m2fmPage_a">下一页</span>
        </div>
      )
    } else if (this.state.pages['previous'] || this.state.pages['next']) {
      pager = (
        <div className="m2fm_page">
          <span className="m2fmPage_a">上一页</span>
          <a onClick={this.onPageClick.bind(this, true)} href="javascript:;" className="m2fmPage_a on">下一页</a>
        </div>
      )
    }

    return (
      <div id="header">
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" value={this.state.searchKeyword} onChange={this.onChange.bind(this, 'searchKeyword') } className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">入党日期：</span>
          <input value={this.state.searchFrom} onClick={this.onClick.bind(this, "isSearchFrom") } onChange={this.onChange.bind(this, "isSearchFrom") } className={this.state.errors['searchFrom'] ? 'm2fm_int m2fm_int2 error' : 'm2fm_int m2fm_int2'} type="text" />
          {searchFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.searchTo} onClick={this.onClick.bind(this, "isSearchTo") } onChange={this.onChange.bind(this, "isSearchTo") } className={this.state.errors['searchTo'] ? 'm2fm_int m2fm_int2 error' : 'm2fm_int m2fm_int2'}  type="text" />
          {searchToEl}
          <span className="m2fm_ss1">
            <input onChange={() => {
              this.state.isChildren = !this.state.isChildren
              this.setState(this.state)
            }} checked={this.state.isChildren} className="lay-rad" name="" type="checkbox" value="" /> 包含下级
          </span>
          <input onClick={this.onSearch.bind(this) } type="submit" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan={7}>
                  <OrgList org={this.props.orgState.org} onOrgSelect={(currentOrg: models.Org) => {
                    this.load(currentOrg, '')
                  } } />
                </td>
              </tr>
              <tr className="m2th">
                <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
                <td>姓名</td>
                <td>性别</td>
                <td>所属组织</td>
                <td>入党日期</td>
                <td>手机</td>
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
)(PartyMemberDYPage);
