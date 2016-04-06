import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  defaultTask: models.TestDefaultTask
  onClose: (isReload: boolean) => void
}

interface S {
  winType: string
  controls: { [index: string]: boolean }
  defaultTask: models.TestDefaultTask
  solutions: Array<models.TestSolution>
  orgs: Array<models.Org>
  checkedOrgIDs: Array<string>
}

export default class FBKHRWXZ_JITUAN extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: 'list',
      controls: {},
      defaultTask: this.props.defaultTask || new models.TestDefaultTask(),
      solutions: null,
      orgs: null,
      checkedOrgIDs: null
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.defaultTask)
  }

  componentDidMount() {
    this.load(this.props.defaultTask)
  }

  load(defaultTask: models.TestDefaultTask) {
    defaultTask = defaultTask || new models.TestDefaultTask()
    client.orgs.searchDFDZ((err: models.Error, res: Array<models.Org>) => {
      this.setState({
        winType: 'list',
        controls: {},
        defaultTask: defaultTask,
        solutions: null,
        orgs: res,
        checkedOrgIDs: defaultTask.orgIDs ? defaultTask.orgIDs.split(',') : []
      })
      this.setState(this.state)
    })
  }

  onMain(winType: string) {
    this.state.winType = winType
    this.setState(this.state)
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    if (name === 'solutionName' && !this.state.solutions) {
      utils.DOM.loading(true)
      client.testSolutions.list((err: models.Error, res: Array<models.TestSolution>) => {
        utils.DOM.loading(false)
        this.state.solutions = res
        this.setState(this.state)
      })
    } else {
      this.setState(this.state)
    }
  }

  onCalendarSelect(name: string, date: Date, e) {
    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = !this.state.controls[name]
    this.state.defaultTask[name] = dateStr
    this.setState(this.state);
  }

  onValueChange(solution: models.TestSolution, e) {
    this.state.controls['solutionName'] = false
    this.state.defaultTask.solutionID = solution.id
    this.state.defaultTask.solutionName = solution.solutionName
    this.setState(this.state);
  }

  onCheck(org: models.Org) {
    const orgID = org.id + ''
    if (this.state.checkedOrgIDs.indexOf(orgID) === -1) {
      this.state.checkedOrgIDs.push(orgID)
    } else {
      this.state.checkedOrgIDs.splice(this.state.checkedOrgIDs.indexOf(orgID), 1)
    }
    this.setState(this.state)
  }

  onSubmit() {
    utils.DOM.loading(true)
    if (this.props.defaultTask) {
      client.testDefaultTasks.edit(this.state.defaultTask, this.state.checkedOrgIDs, () => {
        utils.DOM.loading(false)
        this.props.onClose(true)
      })
    } else {
      client.testDefaultTasks.create(this.state.defaultTask, this.state.checkedOrgIDs, () => {
        utils.DOM.loading(false)
        this.props.onClose(true)
      })
    }
  }

  render() {
    if (!this.state.orgs) return <InnerLoading />

    let solutionsEl = null
    if (this.state.solutions) {
      solutionsEl = this.state.solutions.map((solution: models.TestSolution) => {
        return <dd key={solution.id} onClick={this.onValueChange.bind(this, solution) }>{solution.solutionName}</dd>
      })
    }

    let defaultStartTimeEl = null
    let defaultEndTimeEl = null
    let defaultNoticeTimeEl = null
    if (this.state.controls['defaultStartTime']) {
      defaultStartTimeEl = (
        <div style={{ position: "absolute", left: "15%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "defaultStartTime") } />
        </div>
      )
    }
    if (this.state.controls['defaultEndTime']) {
      defaultEndTimeEl = (
        <div style={{ position: "absolute", left: "55%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "defaultEndTime") } />
        </div>
      )
    }
    if (this.state.controls['defaultNoticeTime']) {
      defaultNoticeTimeEl = (
        <div style={{ position: "absolute", left: "15%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "defaultNoticeTime") } />
        </div>
      )
    }

    const orgsEl = this.state.orgs.map((org: models.Org) => {
      return <p key={org.id} onClick={this.onCheck.bind(this, org)}><input checked={this.state.checkedOrgIDs.indexOf(org.id + '') !== -1} className="lay-rad" type="checkbox" />　{org.orgName}</p>
    })

    return (
      <div>
        <div className="layerBg">
        </div>
        <div className="layerCon1" style={{ height: 520, marginTop: '-260px', position: 'fixed', width: 646, marginLeft: '-323px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }>
          </i>
          <div className="layer_t">发布考核任务</div>
          <div className="m2nadBox m2per_boxUl m2nadBox2" style={{ paddingTop: 30 }}>
            <ul>
              <li>
                <span className="lay_s1">考核方案</span>
                <div className="m2fm_selContent" style={{position: "relative"}}>
                  <input onClick={this.onClick.bind(this, "solutionName") } value={this.state.defaultTask.solutionName} type="text" className="m2fm_int m2fm_int3 m2fm_int9" style={{ width: 450 }} />
                  <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", top: "30px", left: "80px", width: 450, display: this.state.controls["solutionName"] ? "block" : "none" }}>
                    <dl>
                      {solutionsEl}
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="lay_s1">考核时间</span>
                <input value={utils.Translate.toShortDate(this.state.defaultTask.defaultStartTime)} onClick={this.onClick.bind(this, "defaultStartTime") } type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 197 }} />
                {defaultStartTimeEl}
                <span className="lay_s1">至</span>
                <input value={utils.Translate.toShortDate(this.state.defaultTask.defaultEndTime)} onClick={this.onClick.bind(this, "defaultEndTime") } type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 197 }} />
                {defaultEndTimeEl}
              </li>
              <li style={{ height: 'auto' }}>
                <span className="lay_s1">选择考核对象</span>
                <div className="lay_ckBox">
                  {orgsEl}
                </div>
                <div className="clear" />
              </li>
              <li>
                <span className="lay_s1">通知设置</span>
                <input value={utils.Translate.toShortDate(this.state.defaultTask.defaultNoticeTime)} onClick={this.onClick.bind(this, "defaultNoticeTime") } type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 197 }} />
                {defaultNoticeTimeEl}
                <span className="cor_red">（在此时间之后需要发站内信提醒考核对象）</span>
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingTop: 25, paddingLeft: 0, textAlign: 'center' }}>
            <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="m2btn_a1">确 定</a>
            <a onClick={this.props.onClose.bind(this, false)} href="javascript:;" className="m2btn_a2">取 消</a>
          </div>
        </div>

      </div>
    )
  }
}
