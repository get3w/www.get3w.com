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
import FBKHRWXZ_JITUAN from "../../../components/dwgz/fbkhrwxz_jituan/form"
import Confirm from "../../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  defaultTasks: Array<models.TestDefaultTask>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  solutions: Array<models.TestSolution>
  solution: models.TestSolution
  startDate: string
  endDate: string
}

class FBKHRW_JITUAN extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      defaultTasks: null,
      winType: '',
      id: null,
      controls: {},
      solutions: null,
      solution: null,
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
    client.testDefaultTasks.search(false, this.state.solution ? this.state.solution.id : 0, this.state.startDate, this.state.endDate, (err: models.Error, res: Array<models.TestDefaultTask>) => {
      this.state.defaultTasks = res
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
      this.load()
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

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load()
  }

  onDelete(id, e) {
    client.testDefaultTasks.delete(id, () => {
      this.onClose(true, e)
    })
  }

  onEnd(id, e) {
    client.testDefaultTasks.end(id, () => {
      this.onClose(true, e)
    })
  }

  onValueChange(solution: models.TestSolution, e) {
    this.state.controls['solutionName'] = false
    this.state.solution = solution
    this.setState(this.state);
  }

  render() {
    if (!this.state.defaultTasks) return <InnerLoading />

    let i = 1
    const listEl = this.state.defaultTasks.map((defaultTask: models.TestDefaultTask) => {
      return (
        <tr key={defaultTask.id}>
          <td className="center">{i++}</td>
          <td className="left">
            {defaultTask.solutionName}
          </td>
          <td className="center">{utils.Translate.toShortDate(defaultTask.defaultStartTime)}</td>
          <td className="center">{utils.Translate.toShortDate(defaultTask.defaultEndTime)}</td>
          <td className="center">{utils.Translate.toShortDate(defaultTask.defaultNoticeTime)}</td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_FBKHRWXZ_JITUAN, defaultTask.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM + "-end", defaultTask.id) } className="m2fm_abtn" href="javascript:;">结束</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM, defaultTask.id) } className="m2fm_abtn" href="javascript:;">删除</a>
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let defaultTask = null
      this.state.defaultTasks.forEach((o: models.TestDefaultTask) => {
        if (this.state.id === o.id) {
          defaultTask = o
        }
      })

      if (this.state.winType === constants.WinTypes.DWGZ_FBKHRWXZ_JITUAN) {
        formEl = <FBKHRWXZ_JITUAN defaultTask={defaultTask} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除考核任务"} onSubmit={this.onDelete.bind(this, defaultTask.id) } onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM + '-end') {
        formEl = <Confirm title={"结束考核任务"} onSubmit={this.onEnd.bind(this, defaultTask.id) } onClose={this.onClose.bind(this) } />
      }
    }

    let solutionsEl = null
    if (this.state.solutions) {
      solutionsEl = this.state.solutions.map((solution: models.TestSolution) => {
        return <dd key={solution.id} onClick={this.onValueChange.bind(this, solution) }>{solution.solutionName}</dd>
      })
    }

    let startDateEl = null
    let endDateEl = null
    if (this.state.controls['startDate']) {
      startDateEl = (
        <div style={{ position: "absolute", left: "50%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startDate") } />
        </div>
      )
    }
    if (this.state.controls['endDate']) {
      endDateEl = (
        <div style={{ position: "absolute", left: "65%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endDate") } />
        </div>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">考核方案：</span>

          <div className="m2fm_selContent" style={{position: "relative"}}>
            <input onClick={this.onClick.bind(this, "solutionName") } value={this.state.solution ? this.state.solution.solutionName : ''} type="text" className="m2fm_int m2fm_int3 m2fm_int9" style={{ width: 250 }} />
            <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", top: "40px", left: "20px", width: 250, display: this.state.controls["solutionName"] ? "block" : "none" }}>
              <dl>
                {solutionsEl}
              </dl>
            </div>
          </div>

          <span className="m2fm_ss1">考核时间：</span>
          <input value={utils.Translate.toShortDate(this.state.startDate)} onClick={this.onClick.bind(this, "startDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" placeholder="2016-01-20" style={{ width: 140 }} />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={utils.Translate.toShortDate(this.state.endDate)} onClick={this.onClick.bind(this, "endDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" placeholder="2016-01-20" style={{ width: 140 }} />
          {endDateEl}
          <a onClick={() => {
            this.load()
          }} className="m2fm_pubBtn1" href="javascript:;">搜索</a>
        </div>

        <div className="m2fm_tabBox m2fm_tabBox2">
          <div className="m2fm_btn2">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_FBKHRWXZ_JITUAN) } href="javascript:;" className="m2fm_pubBtn2">新 增</a>
          </div>
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td className="center">序号</td>
                <td className="left">考核方案</td>
                <td className="center">考核开始时间 </td>
                <td className="center">考核截止时间 </td>
                <td className="center">通知设置时间 </td>
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
)(FBKHRW_JITUAN);
