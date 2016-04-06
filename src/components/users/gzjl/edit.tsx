import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  userWork: models.UserWork
  onMain: (isEdit: boolean, userWork: models.UserWork) => void
}

interface S {
  userWork: models.UserWork
  controls: {[index: string]: boolean}
}

export default class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      userWork: this.props.userWork ? this.props.userWork : new models.UserWork(),
      controls: {},
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      userWork: nextProps.userWork ? nextProps.userWork : new models.UserWork(),
      controls: {},
    })
  }

  onChange(name: string, e) {
    this.state.userWork[name] = e.target.value
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {
    
    const dateStr = utils.Translate.toShortDate(date)
    this.state.userWork[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    if (this.props.userWork) {
      client.userWorks.edit(this.state.userWork, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onMain(false, null)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      this.state.userWork.userName = this.props.user.userName
      client.userWorks.create(this.state.userWork, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onMain(false, null)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  render() {
    const userWork = this.state.userWork

    let startTimeEl = null
    if (this.state.controls['startTime']) {
      startTimeEl = (
        <div style={{position: "absolute", left: "50%"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'startTime') } />
        </div>
      )
    }
    let endTimeEl = null
    if (this.state.controls['endTime']) {
      endTimeEl = (
        <div style={{position: "absolute", left: "50%"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'endTime') } />
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm_u1 m2per_u4">
          <ul>
            <li>
              <span className="m2fm_us1">公司：</span>
              <input value={userWork.company} onChange={this.onChange.bind(this, 'company') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">部门：</span>
              <input value={userWork.department} onChange={this.onChange.bind(this, 'department') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">职务：</span>
              <input value={userWork.position} onChange={this.onChange.bind(this, 'position') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">开始时间：</span>
              <input value={utils.Translate.toShortDate(userWork.startTime) } onClick={this.onClick.bind(this, "startTime") } className="m2fm_u1Int m2fm_int2" type="text" />
              {startTimeEl}
            </li>
            <li>
              <span className="m2fm_us1">截止时间：</span>
              <input value={utils.Translate.toShortDate(userWork.endTime) } onClick={this.onClick.bind(this, "endTime") } className="m2fm_u1Int m2fm_int2" type="text" />
              {endTimeEl}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm_sbxBtn">
          <a onClick={this.onSubmit.bind(this)} className="m2btn_a1" href="javascript:;">
            {this.props.userWork ? "修 改" : "新 增"}
          </a>
          <a onClick={ (e) => {
            this.props.onMain(false, null)
          }} className="m2btn_a2" href="javascript:;">取 消</a>
        </div>
      </div>
    )
  }
}
