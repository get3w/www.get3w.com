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
import TONGYI from "../../../components/users/zhuanchu_add/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  flowUsers: Array<models.FlowUser>
  winType: string
  id: number
  controls: {[index: string]: boolean}
  name: string
  flowDateFrom: string
  flowDateTo: string
  comeFrom: string
}

class CLRDYQK extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      flowUsers: null,
      winType: '',
      id: null,
      controls: {},
      name: null,
      comeFrom: null,
      flowDateFrom: null,
      flowDateTo: null,
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.flowUsers.search(false, orgID, this.state.name, this.state.flowDateFrom, this.state.flowDateTo, this.state.comeFrom, true, (err: models.Error, res: Array<models.FlowUser>) => {
      this.state.flowUsers = res
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

  onSearch(e) {
    this.load(this.props.orgState.org.id)
  }

  render() {
    if (!this.state.flowUsers) return <InnerLoading />
    const org = this.props.orgState.org

    const listEl = this.state.flowUsers.map((flowUser: models.FlowUser) => {
      return (
        <tr key={flowUser.id}>
          <td>{flowUser.name}</td>
          <td>{flowUser.sex}</td>
          <td>{flowUser.orgName}</td>
          <td>{flowUser.comeFrom}</td>
          <td>{utils.Translate.toShortDate(flowUser.flowDate)}</td>
          <td>{utils.Translate.toShortDate(flowUser.partyDate)}</td>
          <td>{flowUser.mobile}</td>
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

    let flowDateFromEl = null
    let flowDateToEl = null
    if (this.state.controls['flowDateFrom']) {
      flowDateFromEl = (
        <div style={{position: "absolute", left: "40%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "flowDateFrom")} />
        </div>
      )
    }
    if (this.state.controls['flowDateTo']) {
      flowDateToEl = (
        <div style={{position: "absolute", left: "40%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "flowDateTo")} />
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input value={this.state.name} onChange={this.onChange.bind(this, 'name')} type="text" name="" className="m2fm_int m2fm_int6" style={{width: "110px"}} />
          <span className="m2fm_ss1">流入日期：</span>
          <input value={this.state.flowDateFrom} onClick={this.onClick.bind(this,"flowDateFrom")} type="text" name="" className="m2fm_int m2fm_int6" style={{ width: "110px" }} />
          {flowDateFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.flowDateTo} onClick={this.onClick.bind(this,"flowDateTo")} type="text" name="" className="m2fm_int m2fm_int6" style={{ width: "110px" }} />
          {flowDateToEl}
          <span className="m2fm_ss1">流动地域：</span>
          <input value={this.state.comeFrom} onChange={this.onChange.bind(this, 'comeFrom')} type="text" name="" className="m2fm_int m2fm_int6" style={{width: "110px"}} />
          <input onClick={this.onSearch.bind(this)} type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan={11} style={{ textAlign: "right" }}>
                  <img src="/assets/images/m2btn2.jpg" width="76" height="32" style={{ marginLeft: "10px" }} />
                </td>
              </tr>
              <tr className="m2th">
                <td>姓名</td>
                <td>性别</td>
                <td>登记党支部</td>
                <td>流动地域</td>
                <td>流入日期</td>
                <td>入党日期</td>
                <td>手机</td>
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
)(CLRDYQK);
