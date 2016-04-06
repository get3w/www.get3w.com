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
import Location from "../../../components/location"
import SubNav from "../../../components/partymembers/subNav"
import * as actions from '../../../actions/authActions';
import * as states from '../../../constants/states'
import * as constants from '../../../constants'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  ots: Array<models.OrgTransfer>
  winType: string
  id: number
  controls: {[index: string]: boolean}
  transferType: string
  applyDateFrom: string
  applyDateTo: string
}

class DYZCQK extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ots: null,
      winType: '',
      id: null,
      controls: {},
      transferType: null,
      applyDateFrom: null,
      applyDateTo: null,
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.orgTransfers.search(orgID, 0, null, null, '转接完成', this.state.transferType, this.state.applyDateFrom, this.state.applyDateTo, true, (err: models.Error, res: Array<models.OrgTransfer>) => {
      this.state.ots = res
      this.setState(this.state)
    })
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

  onValueChange(value: string, e) {
    this.state.transferType = value
    this.state.controls["transferType"] = false
    this.setState(this.state);
  }

  render() {
    if (!this.state.ots) return <InnerLoading />

    const listEl = this.state.ots.map((ot: models.OrgTransfer) => {
      return (
        <tr key={ot.id}>
          <td><a href={"/users/" + ot.userName} target="_blank" className="cor_red">{ot.displayName}</a></td>
          <td>{ot.sourceOrgName}</td>
          <td>{ot.targetOrgName}</td>
          <td>{ot.applyState}</td>
          <td>{utils.Translate.toShortDate(ot.applyDate)}</td>
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

    return (
      <div>
        <div className="m2fm_stop" style={{position: "relative"}}>
          <span className="m2fm_ss1">转出类型：</span>
          <input onClick={this.onClick.bind(this, "transferType") } value={this.state.transferType} type="text" name="" className="m2fm_int m2fm_int3" />
          <div className="m2fm_selBox" style={{ position: "absolute", top: "50px", left: "0", display: this.state.controls["transferType"] ? "block" : "none ", width: "270px" }}>
            <dl>
              <dd onClick={this.onValueChange.bind(this, "") }>全部</dd>
              <dd onClick={this.onValueChange.bind(this, "内部调动") }>内部调动</dd>
              <dd onClick={this.onValueChange.bind(this, "移动集团内部转接") }>移动集团内部转接</dd>
              <dd onClick={this.onValueChange.bind(this, "离职转出") }>离职转出</dd>
            </dl>
          </div>

          <span className="m2fm_ss1">转出时间：</span>
          <input value={this.state.applyDateFrom} onClick={this.onClick.bind(this,"applyDateFrom")} type="text" className="m2fm_int m2fm_int2" />
          {applyDateFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.applyDateTo} onClick={this.onClick.bind(this,"applyDateTo")} type="text" className="m2fm_int m2fm_int2" />
          {applyDateToEl}
          <input type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td>姓名</td>
                <td>原组织</td>
                <td>目标组织</td>
                <td>状态</td>
                <td>日期</td>
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
)(DYZCQK);
