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
import CKDWDFXJ from "../../../components/dwgz/ckdwdfxj/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  onTableChange: (tableType, taskID?: number) => void
}

interface S {
  tasks: Array<models.TestTask>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  orgs: Array<models.Org>
  org: models.Org
  startDate: string
  endDate: string
}

class KHCJ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tasks: null,
      winType: '',
      id: null,
      controls: {},
      orgs: null,
      org: null,
      startDate: null,
      endDate: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load()
  }

  componentDidMount() {
    this.load()
  }

  load() {
    client.testTasks.search(true, this.state.org ? this.state.org.id : 0, 0, this.state.startDate, this.state.endDate, (err: models.Error, res: Array<models.TestTask>) => {
      this.state.tasks = res
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
    if (name === 'orgID' && !this.state.orgs) {
      utils.DOM.loading(true)
      client.orgs.searchDFDZ((err: models.Error, res: Array<models.Org>) => {
        utils.DOM.loading(false)
        this.state.orgs = res
        this.setState(this.state)
      })
    } else {
      this.setState(this.state)
    }
  }

  onValueChange(org: models.Org, e) {
    this.state.org = org
    this.state.controls["orgID"] = false
    this.setState(this.state);
  }

  onClose(e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  render() {
    if (!this.state.tasks) return <InnerLoading />

    let orgsEl = null
    if (this.state.orgs) {
      orgsEl = this.state.orgs.map((org: models.Org) => {
        return <dd key={org.id} onClick={this.onValueChange.bind(this, org) }>{org.orgName}</dd>
      })
    }

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

    let i = 1
    const listEl = this.state.tasks.sort((task: models.TestTask) => {
      return null
    }).map((task: models.TestTask) => {
      return (
        <tr key={task.id}>
          <td className="left">{task.orgName}</td>
          <td className="left">{task.solutionName}</td>
          <td className="center">{utils.Translate.toShortDate(task.startTime) + ' 至 ' + utils.Translate.toShortDate(task.endTime) }</td>
          <td className="center"></td>
          <td className="center">{i++}</td>
          <td className="center">
            <a onClick={this.props.onTableChange.bind(this, 'khcj_jituan_dwxq', task.id) } className="m2fm_abtn" href="javascript:;">党委详情</a>
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let task = null
      this.state.tasks.forEach((m: models.TestTask) => {
        if (this.state.id === m.id) {
          task = m
        }
      })
      // if (this.state.winType === constants.WinTypes.DWGZ_CKDWDFXJ) {
      //   formEl = <CKDWDFXJ task={task} onClose={this.onClose.bind(this) } />
      // }
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">考核组织：</span>
          <div className="m2fm_selContent" style={{position: "relative"}}>
            <input onClick={this.onClick.bind(this, "orgID") } value={this.state.org ? this.state.org.orgName : ''} type="text" className="m2fm_int m2fm_int3" style={{ width: 250 }} />
            <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", top: "40px", left: "0", width: 270, display: this.state.controls["orgID"] ? "block" : "none" }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, null) }>全部</dd>
                {orgsEl}
              </dl>
            </div>
          </div>

          <span className="m2fm_ss1">考核时间：</span>
          <input value={utils.Translate.toShortDate(this.state.startDate)} onClick={this.onClick.bind(this, "startDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 140 }} />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={utils.Translate.toShortDate(this.state.endDate)} onClick={this.onClick.bind(this, "endDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 140 }} />
          {endDateEl}

          <a onClick={() => {
            this.load()
          }} className="m2fm_pubBtn1" href="javascript:;">搜索</a>
        </div>

        <div className="m2fm_tabBox m2fm_tabBox2">
          <div className="m2fm_btn2">
            <a className="m2fm_pubBtn2" href="javascript:;">导出</a>
          </div>
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td className="left">组织名称</td>
                <td className="center">考核方案</td>
                <td className="center">考核时间</td>
                <td className="center">综合分</td>
                <td className="center">排名</td>
                <td className="center">操作</td>
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
)(KHCJ);
