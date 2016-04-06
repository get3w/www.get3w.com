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
  record: models.Record
  onMain: (isEdit: boolean, record: models.Record) => void
}

interface S {
  record: models.Record
  controls: {[index: string]: boolean}
}

export default class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      record: this.props.record ? this.props.record : new models.Record(),
      controls: {},
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      record: nextProps.record ? nextProps.record : new models.Record(),
      controls: {},
    })
  }

  onChange(name: string, e) {
    this.state.record[name] = e.target.value
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {
    
    const dateStr = utils.Translate.toShortDate(date)
    this.state.record[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    if (this.props.record) {
      client.records.edit(this.state.record, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onMain(false, null)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      this.state.record.userName = this.props.user.userName
      this.state.record.displayName = this.props.user.displayName
      this.state.record.orgID = this.props.user.orgID
      this.state.record.orgName = this.props.user.orgName
      this.state.record.period = this.props.user.userType
      this.state.record.summary = this.props.user.orgName + " 提交思想汇报"
      this.state.record.type1 = '思想汇报'
      client.records.create(this.state.record, true, (err, res) => {
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
    const record = this.state.record

    let happenDateEl = null
    if (this.state.controls['happenDate']) {
      happenDateEl = (
        <div style={{position: "absolute", left: "50%"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'happenDate') } />
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm_u1 m2per_u4">
          <ul>
            <li>
              <span className="m2fm_us1">时间：</span>
              <input value={utils.Translate.toShortDate(record.happenDate) } onClick={this.onClick.bind(this, "happenDate") } className="m2fm_u1Int m2fm_int2" type="text" />
              {happenDateEl}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm_sbxBtn">
          <a onClick={this.onSubmit.bind(this)} className="m2btn_a1" href="javascript:;">
            {this.props.record ? "修 改" : "新 增"}
          </a>
          <a onClick={ (e) => {
            this.props.onMain(false, null)
          }} className="m2btn_a2" href="javascript:;">取 消</a>
        </div>
      </div>
    )
  }
}
