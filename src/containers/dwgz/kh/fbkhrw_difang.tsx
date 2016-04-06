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
import FBKHRWXZ_DIFANG from "../../../components/dwgz/fbkhrwxz_difang/form"
import Confirm from "../../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  tasks: Array<models.TestTask>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  solutionID: number
  startDate: string
  endDate: string
}

class FBKHRW_DIFANG extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tasks: null,
      winType: '',
      id: null,
      controls: {},
      solutionID: 0,
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
    client.testTasks.search(false, this.props.orgState.org.id, this.state.solutionID, this.state.startDate, this.state.endDate, (err: models.Error, res: Array<models.TestTask>) => {
      this.state.tasks = res
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
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load()
  }

  onDelete(id, e) {
    client.testTasks.delete(id, () => {
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.tasks) return <InnerLoading />

    let i = 1
    const listEl = this.state.tasks.map((task: models.TestTask) => {
      return (
        <tr key={task.id}>
          <td className="center">{i++}</td>
          <td className="left">{task.solutionName}</td>
          <td className="center">{utils.Translate.toShortDate(task.startTime)}</td>
          <td className="center">{utils.Translate.toShortDate(task.endTime)}</td>
          <td className="center">{utils.Translate.toShortDate(task.noticeTime)}</td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_FBKHRWXZ_DIFANG, task.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let task = null
      this.state.tasks.forEach((o: models.TestTask) => {
        if (this.state.id === o.id) {
          task = o
        }
      })

      if (this.state.winType === constants.WinTypes.DWGZ_FBKHRWXZ_DIFANG) {
        formEl = <FBKHRWXZ_DIFANG task={task} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除考核任务"} onSubmit={this.onDelete.bind(this, task.id) } onClose={this.onClose.bind(this) } />
      }
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">考核方案：</span>
          <div className="m2fm_selContent">
            <input type="text" className="m2fm_int" style={{ width: 250 }} />
          </div>
          <span className="m2fm_ss1">考核时间：</span>
          <input type="text" className="m2fm_int m2fm_int2 m2fm_int7" placeholder="2016-01-20" style={{ width: 140 }} />
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input type="text" className="m2fm_int m2fm_int2 m2fm_int7" placeholder="2016-01-20" style={{ width: 140 }} />
          <a className="m2fm_pubBtn1" href="javascript:;">搜索</a>
        </div>

        <div className="m2fm_tabBox m2fm_tabBox2">
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
)(FBKHRW_DIFANG);
