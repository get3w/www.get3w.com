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
  userEducation: models.UserEducation
  onMain: (isEdit: boolean, userEducation: models.UserEducation) => void
}

interface S {
  userEducation: models.UserEducation
  controls: {[index: string]: boolean}
}

export default class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      userEducation: this.props.userEducation ? this.props.userEducation : new models.UserEducation(),
      controls: {},
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      userEducation: nextProps.userEducation ? nextProps.userEducation : new models.UserEducation(),
      controls: {},
    })
  }

  onChange(name: string, e) {
    this.state.userEducation[name] = e.target.value
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {
    
    const dateStr = utils.Translate.toShortDate(date)
    this.state.userEducation[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    if (this.props.userEducation) {
      client.userEducations.edit(this.state.userEducation, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onMain(false, null)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      this.state.userEducation.userName = this.props.user.userName
      client.userEducations.create(this.state.userEducation, (err, res) => {
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
    const userEducation = this.state.userEducation

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
              <span className="m2fm_us1">学历：</span>
              <input value={userEducation.degree} onChange={this.onChange.bind(this, 'degree') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">学校：</span>
              <input value={userEducation.school} onChange={this.onChange.bind(this, 'school') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">开始时间：</span>
              <input value={utils.Translate.toShortDate(userEducation.startTime) } onClick={this.onClick.bind(this, "startTime") } className="m2fm_u1Int m2fm_int2" type="text" />
              {startTimeEl}
            </li>
            <li>
              <span className="m2fm_us1">截止时间：</span>
              <input value={utils.Translate.toShortDate(userEducation.endTime) } onClick={this.onClick.bind(this, "endTime") } className="m2fm_u1Int m2fm_int2" type="text" />
              {endTimeEl}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm_sbxBtn">
          <a onClick={this.onSubmit.bind(this)} className="m2btn_a1" href="javascript:;">
            {this.props.userEducation ? "修 改" : "新 增"}
          </a>
          <a onClick={ (e) => {
            this.props.onMain(false, null)
          }} className="m2btn_a2" href="javascript:;">取 消</a>
        </div>
      </div>
    )
  }
}
