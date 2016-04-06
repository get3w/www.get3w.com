import * as React from 'react'
import * as _ from 'lodash'
import * as Upload from 'rc-upload'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  org: models.Org
  record: models.Record
  openMain: (mainType: string) => void
  onClose: Function
}

interface S {
  isCalendar: boolean
  calendarDate: Date
  content: string
  zsclRecord: models.Record
}

export default class GONGSHI extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCalendar: false,
      calendarDate: new Date(),
      content: '',
      zsclRecord: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.record)
  }

  componentDidMount() {
    this.load(this.props.record)
  }

  load(record: models.Record) {
    if (!record) {
      client.records.getZSCL(this.props.user.userName, (err: models.Error, res: models.Record) => {
        if (!res) {
          utils.Swal.warning('政审材料未添加，请先添加政审材料')
          this.props.onClose()
        } else {
          if (res.happenDate) {
            this.setState({
              isCalendar: false,
              calendarDate: new Date(),
              content: '',
              zsclRecord: res,
            })
          }
        }
      })
    } else {
      this.setState({
        isCalendar: false,
        calendarDate: record.happenDate,
        content: record.remarks,
        zsclRecord: null,
      })
    }
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    if (this.state.zsclRecord) {

    }

    utils.DOM.loading(true)
    if (this.props.record) {
      const record = this.props.record
      record.happenDate = this.state.calendarDate
      record.remarks = this.state.content
      client.records.edit(record, () => {
        utils.DOM.loading(false)
        this.props.openMain('list')
      })
    } else {
      const summary = this.props.user.orgName + ' 线上公示'
    }
  }

  onCalendarSelect(date: Date, e) {

    this.state.calendarDate = date
    this.state.isCalendar = false
    this.setState(this.state);
  }

  onCalendarClick(e) {
    this.state.isCalendar = !this.state.isCalendar
    this.setState(this.state);
  }

  render() {
    const title = '公示'

    let calendarDateEl = null
    if (this.state.isCalendar) {
      calendarDateEl = (
        <div style={{position: "absolute", left: "35%", marginTop: "0"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this)} />
        </div>
      )
    }

    return (
      <div>
      <div className="m2nadBox" style={{ paddingTop: 30 }}>
        <ul>
          <li>
            <span className="lay_s1" style={{ width: 72 }}>公示时间</span>
            <input value={utils.Translate.toShortDate(this.state.calendarDate)} onClick={this.onCalendarClick.bind(this)} type="text" className="m2fm_int m2fm_int2 m2fm_int10" />
            {calendarDateEl}
          </li>
          <li>
            <span className="lay_s1" style={{ width: 72 }}>内容</span>
            <textarea value={this.state.content} onChange={this.onChange.bind(this, "content")} className="m2fm_int m2fm_int10" style={{ height: 100, float: 'left', marginRight: 10 }} />
          </li>
        </ul>
      </div>
      <div className="m2btnBox2" style={{ paddingLeft: 145, paddingTop: 65 }}>
        <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
        <a href="javascript:;" className="m2btn_a2" onClick={this.props.openMain.bind(this, 'list', null) }>取 消</a>
      </div>
      </div>
    )
  }
}
