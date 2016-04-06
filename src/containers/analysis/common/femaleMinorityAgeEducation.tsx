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

interface P {
  analysisType: string
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  results: Array<{
    orgID: number
    orgName: string
    female: number
    minority: number
    age1: number
    age2: number
    age3: number
    education1: number
    education2: number
    education3: number
    education4: number
    education5: number
    education6: number
    total: number
  }>
  controls: { [index: string]: boolean }
  orgID: number
  orgName: string
  startDate: string
  endDate: string
}

class FemaleMinorityAgeEdution extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      controls: {},
      orgID: null,
      orgName: null,
      startDate: '',
      endDate: '',
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org.id, nextProps.analysisType)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id, this.props.analysisType)
  }

  load(orgID: number, analysisType: string) {
    this.state.orgID = orgID
    utils.DOM.loading(true)
    client.analysis.FemaleMinorityAgeEducation(analysisType, this.state.orgID, this.state.startDate, this.state.endDate, (err: models.Error, res) => {
      utils.DOM.loading(false)
      this.state.results = res
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

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.state.orgID, this.props.analysisType)
  }

  onValueChange(orgID: number, orgName: string) {
    this.state.orgID = orgID
    this.state.orgName = orgName
    this.state.controls['orgName'] = false
    this.setState(this.state)
  }

  render() {
    if (!this.state.results) return <InnerLoading />

    let startDateEl = null
    let endDateEl = null
    if (this.state.controls['startDate']) {
      startDateEl = (
        <div style={{ position: "absolute", left: "45%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startDate") } />
        </div>
      )
    }
    if (this.state.controls['endDate']) {
      endDateEl = (
        <div style={{ position: "absolute", left: "55%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endDate") } />
        </div>
      )
    }

    let orgNamesEl = []
    let listEl = this.state.results.map((result) => {
      orgNamesEl.push(<dd key={result.orgID} onClick={this.onValueChange.bind(this, result.orgID, result.orgName)}>{result.orgName}</dd>)
      return (
        <tr key={result.orgID}>
          <td className="left m2tabs_ltd">{result.orgName}</td>
          <td className="center">{result.female}</td>
          <td width="8%" className="center">{result.minority}</td>
          <td width="8%" className="center">{result.age1}</td>
          <td width="10%" className="center">{result.age2}</td>
          <td width="10%" className="center">{result.age3}</td>
          <td width="6%" className="center">{result.education1}</td>
          <td width="8%" className="center">{result.education2}</td>
          <td className="center">{result.education3}</td>
          <td className="center">{result.education4}</td>
          <td className="center">{result.education5}</td>
          <td className="center">{result.education6}</td>
          <td className="center m2tabs_rtd">{result.total}</td>
        </tr>
      )
    })

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_ss1">组织机构：</span>
          <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
            <input onClick={this.onClick.bind(this, 'orgName')} value={this.state.orgName ? this.state.orgName : '全部'} type="text" className="m2fm_int m2fm_int3" />
            <div className="m2fm_selBox" style={{ display: this.state.controls['orgName'] ? 'block' : 'none', width: 146 }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, this.props.orgState.org.id, '')}>全部</dd>
                {orgNamesEl}
              </dl>
            </div>
          </div>

          <span className="m2fm_ss1">统计时间：</span>
          <input value={utils.Translate.toShortDate(this.state.startDate)} onClick={this.onClick.bind(this, "startDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 120 }} />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={utils.Translate.toShortDate(this.state.endDate)} onClick={this.onClick.bind(this, "endDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 120 }} />
          {endDateEl}

          <a className="m2fm_pubBtn2" style={{ float: 'right', marginRight: 20 }} href="javascript:;">导 出</a>
          <a onClick={this.onSearch.bind(this)} className="m2fm_pubBtn1" style={{ float: 'right' }} href="javascript:;">搜索</a>
        </div>

        <div className="m2tabs">
          <table width="100%">
            <tbody>
              <tr className="m2tabs_th m2tabs_th2 m2tabs_th3">
                <td width="10%" rowSpan={2} className="center m2tabs_ltd">组  织</td>
                <td className="center" style={{ borderBottom: '1px solid #fff' }}>&nbsp; </td>
                <td className="center" style={{ borderBottom: '1px solid #fff' }}>&nbsp; </td>
                <td colSpan={3} className="center" style={{ borderBottom: '1px solid #fff' }}>年龄</td>
                <td colSpan={6} className="center" style={{ borderBottom: '1px solid #fff' }}>学历</td>
                <td width="7%" rowSpan={2} className="center m2tabs_rtd">总数</td>
              </tr>
              <tr className="m2tabs_th m2tabs_th2 m2tabs_th3">
                <td width="3%" className="center">女</td>
                <td className="center">少数民族</td>
                <td width="8%" className="center">25及以下</td>
                <td width="10%" className="center">26岁至49岁</td>
                <td width="10%" className="center">50岁及以上</td>
                <td width="6%" className="center">研究生</td>
                <td width="8%" className="center">大学本科</td>
                <td width="8%" className="center">大学专科</td>
                <td width="4%" className="center">中专</td>
                <td width="8%" className="center">高中中技</td>
                <td width="10%" className="center">初中及以下</td>
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
)(FemaleMinorityAgeEdution);
