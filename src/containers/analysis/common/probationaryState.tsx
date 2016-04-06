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
import DWZPF from "../../../components/dwgz/dwzpf/form"
import CKDWDFXJ from "../../../components/dwgz/ckdwdfxj/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  results: Array<{
    orgID: number
    orgName: string
    state1: number
    state2: number
    state3: number
    state4: number
    total: number
  }>
  controls: { [index: string]: boolean }
  orgID: number
  orgName: string
}

class ProbationaryState extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      controls: {},
      orgID: null,
      orgName: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    this.state.orgID = orgID
    utils.DOM.loading(true)
    client.analysis.ProbationaryState(this.state.orgID, (err: models.Error, res) => {
      utils.DOM.loading(false)
      this.state.results = res
      this.setState(this.state)
    })
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onSearch(e) {
    this.load(this.state.orgID)
  }

  onValueChange(orgID: number, orgName: string) {
    this.state.orgID = orgID
    this.state.orgName = orgName
    this.state.controls['orgName'] = false
    this.setState(this.state)
  }

  render() {
    if (!this.state.results) return <InnerLoading />

    let orgNamesEl = []
    let listEl = this.state.results.map((result) => {
      orgNamesEl.push(<dd key={result.orgID} onClick={this.onValueChange.bind(this, result.orgID, result.orgName) }>{result.orgName}</dd>)
      return (
        <tr key={result.orgID}>
          <td className="left m2tabs_ltd">{result.orgName}</td>
          <td className="center">{result.state1}</td>
          <td className="center">{result.state2}</td>
          <td className="center">{result.state3}</td>
          <td className="center">{result.state4}</td>
          <td className="center m2tabs_rtd">{result.total}</td>
        </tr>
      )
    })

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_ss1">组织机构：</span>
          <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
            <input onClick={this.onClick.bind(this, 'orgName') } value={this.state.orgName ? this.state.orgName : '全部'} type="text" className="m2fm_int m2fm_int3" />
            <div className="m2fm_selBox" style={{ display: this.state.controls['orgName'] ? 'block' : 'none', width: 146 }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, this.props.orgState.org.id, '') }>全部</dd>
                {orgNamesEl}
              </dl>
            </div>
          </div>
          <a className="m2fm_pubBtn2" style={{ float: 'right', marginRight: 20 }} href="javascript:;">导 出</a>
          <a onClick={this.onSearch.bind(this) } className="m2fm_pubBtn1" style={{ float: 'right' }} href="javascript:;">搜索</a>
        </div>

        <div className="m2tabs">
          <table width="100%">
            <tbody>
              <tr className="m2tabs_th">
                <td className="m2tabs_ltd center">组  织 </td>
                <td className="center">如期转为正式党员</td>
                <td className="center">延长预备期转正</td>
                <td className="center">延长预备期</td>
                <td className="center">被取消预备党员资格</td>
                <td className="m2tabs_rtd center">总数</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>


      </div>
    )
  }

  // render() {
  //   if (!this.state.records) return <InnerLoading />
  //
  //   const listEl = this.state.records.map((record: models.Record) => {
  //     return (
  //       <tr key={record.id}>
  //         <td><a href={"/users/" + record.userName} target="_blank" className="cor_red">{record.displayName}</a></td>
  //         <td>{record.orgName}</td>
  //         <td>{record.remarks}</td>
  //         <td>{record.type2}</td>
  //         <td>{utils.Translate.toShortDate(record.happenDate)}</td>
  //       </tr>
  //     )
  //   })
  //
  //   let applyDateFromEl = null
  //   let applyDateToEl = null
  //   if (this.state.controls['applyDateFrom']) {
  //     applyDateFromEl = (
  //       <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
  //         <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "applyDateFrom")} />
  //       </div>
  //     )
  //   }
  //   if (this.state.controls['applyDateTo']) {
  //     applyDateToEl = (
  //       <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
  //         <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "applyDateTo")} />
  //       </div>
  //     )
  //   }
  //
  //   return (
  //     <div>
  //       <div className="m2fm_stop" style={{position: "relative"}}>
  //         <span className="m2fm_ss1">变动情况：</span>
  //         <input onClick={this.onClick.bind(this, "type1") } value={this.state.type1} type="text" name="" className="m2fm_int m2fm_int3" />
  //         <div className="m2fm_selBox" style={{ position: "absolute", top: "50px", left: "0", display: this.state.controls["type1"] ? "block" : "none ", width: "270px" }}>
  //           <dl>
  //             <dd onClick={this.onValueChange.bind(this, "") }>全部</dd>
  //             <dd onClick={this.onValueChange.bind(this, "死亡") }>死亡</dd>
  //             <dd onClick={this.onValueChange.bind(this, "开除党籍") }>开除党籍</dd>
  //           </dl>
  //         </div>
  //
  //         <span className="m2fm_ss1">变动时间：</span>
  //         <input value={this.state.applyDateFrom} onClick={this.onClick.bind(this,"applyDateFrom")} type="text" className="m2fm_int m2fm_int2" />
  //         {applyDateFromEl}
  //         <span className="m2fm_ss1 m2fm_ss2">至</span>
  //         <input value={this.state.applyDateTo} onClick={this.onClick.bind(this,"applyDateTo")} type="text" className="m2fm_int m2fm_int2" />
  //         {applyDateToEl}
  //         <input type="submit" name="" className="m2submit" value="" />
  //       </div>
  //       <div className="m2fm_tabBox m2fm_tabBox2">
  //         <table width="100%">
  //           <tbody>
  //             <tr className="m2th">
  //               <td>姓名</td>
  //               <td>原组织</td>
  //               <td>备注</td>
  //               <td>状态</td>
  //               <td>日期</td>
  //             </tr>
  //             {listEl}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   )
  // }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

export default connect(
  mapStateToProps
)(ProbationaryState);
