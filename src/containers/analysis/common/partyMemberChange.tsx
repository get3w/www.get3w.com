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
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  results: Array<{
    orgID: number
    orgName: string
    startTotal: number
    increase1: number
    increase2: number
    decrease1: number
    decrease2: number
    decrease3: number
    endTotal: number
  }>
  controls: { [index: string]: boolean }
  orgID: number
  orgName: string
  startDate: string
  endDate: string
}

class PartyMemberChange extends React.Component<P, S> {
  constructor(props) {
    super(props)
    const d = new Date()
    this.state = {
      results: null,
      controls: {},
      orgID: null,
      orgName: null,
      startDate: null,
      endDate: utils.Translate.toShortDate(d),
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
    client.analysis.PartyMemberChange(this.state.orgID, this.state.startDate, this.state.endDate, (err: models.Error, res) => {
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
      orgNamesEl.push(<dd key={result.orgID} onClick={this.onValueChange.bind(this, result.orgID, result.orgName) }>{result.orgName}</dd>)
      return (
        <tr key={result.orgID}>
          <td className="left m2tabs_ltd">{result.orgName}</td>
          <td className="center">{result.startTotal}</td>
          <td width="11%" className="center">{result.increase1}</td>
          <td width="11%" className="center">{result.increase2}</td>
          <td width="9%" className="center">{result.decrease1}</td>
          <td width="7%" className="center">{result.decrease2}</td>
          <td className="center">{result.decrease3}</td>
          <td className="center m2tabs_rtd">{result.endTotal}</td>
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

          <span className="m2fm_ss1">统计时间：</span>
          <input value={utils.Translate.toShortDate(this.state.startDate) } onClick={this.onClick.bind(this, "startDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 120 }} />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={utils.Translate.toShortDate(this.state.endDate) } onClick={this.onClick.bind(this, "endDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 120 }} />
          {endDateEl}

          <a className="m2fm_pubBtn2" style={{ float: 'right', marginRight: 20 }} href="javascript:;">导 出</a>
          <a onClick={this.onSearch.bind(this) } className="m2fm_pubBtn1" style={{ float: 'right' }} href="javascript:;">搜索</a>
        </div>

        <div className="m2tabs">
          <table width="100%">
            <tbody>
              <tr className="m2tabs_th m2tabs_th2">
                <td width="17%" rowSpan={2} className="center m2tabs_ltd">组  织</td>
                <td width="8%" rowSpan={2} className="center">起始时间总数</td>
                <td colSpan={2} className="center" style={{ borderBottom: '1px solid #fff' }}>增加</td>
                <td colSpan={3} className="center" style={{ borderBottom: '1px solid #fff' }}>减少</td>
                <td width="11%" rowSpan={2} className="center m2tabs_rtd">结束时间总数</td>
              </tr>
              <tr className="m2tabs_th m2tabs_th2">
                <td className="center">发展党员</td>
                <td width="13%" className="center">转入组织关系</td>
                <td width="9%" className="center">出 党</td>
                <td width="7%" className="center">死 亡</td>
                <td width="13%" className="center">转出组织关系</td>
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
)(PartyMemberChange);
