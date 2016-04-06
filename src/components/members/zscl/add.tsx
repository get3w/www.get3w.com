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
}

interface S {
  isCalendar: boolean
  happenDate: Date
  isQualified: boolean
  fileUrl: string
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCalendar: false,
      happenDate: new Date(),
      isQualified: true,
      fileUrl: '',
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.record)
  }

  componentDidMount() {
    this.load(this.props.record)
  }

  load(record: models.Record) {
    this.setState({
      isCalendar: false,
      happenDate: record ? record.happenDate : new Date(),
      isQualified: record ? (record.remarks === '合格') : true,
      fileUrl: record ? record.attachmentPaths : '',
    })
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onRadioClick(value: boolean, e) {
    this.state.isQualified = value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    const summary = this.props.user.orgName + ' 政审' + (this.state.isQualified ? "合格" : "不合格")
    if (this.props.record) {
      const record = this.props.record
      record.happenDate = this.state.happenDate
      record.summary = summary
      record.remarks = this.state.isQualified ? "合格" : "不合格"
      record.attachmentPaths = this.state.fileUrl
      client.records.edit(record, () => {
        if (!this.state.isQualified) {
          this.props.user.userType = ''
          this.props.user.orgID = 0
          this.props.user.orgName = ''

        } else {
          utils.DOM.loading(false)
          this.props.openMain('list')
        }
      })
    } else {

    }
  }

  onCalendarSelect(date: Date, e) {

    this.state.happenDate = date
    this.state.isCalendar = false
    this.setState(this.state);
  }

  onCalendarClick(e) {
    this.state.isCalendar = !this.state.isCalendar
    this.setState(this.state);
  }

  render() {
    const title = '政审材料'

    let happenDateEl = null
    if (this.state.isCalendar) {
      happenDateEl = (
        <div style={{ position: "absolute", left: "35%", marginTop: "0" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this) } />
        </div>
      )
    }

    const props = null

    return (
      <div>
        <div className="m2nadBox" style={{ paddingTop: 30 }}>
          <ul>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>政审材料</span>
              <input value={this.state.fileUrl} type="text" className="m2fm_int" style={{ width: 196, float: 'left', marginRight: 10 }} />
              <Upload {...props}><a href="javascript:;" className="m2fm_pubBtn2">上 传</a></Upload>
            </li>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>政审结果</span>
              <input checked={this.state.isQualified} onClick={this.onRadioClick.bind(this, true) } name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
              合格&nbsp;
              <input checked={!this.state.isQualified} onClick={this.onRadioClick.bind(this, false) } className="lay-rad" name="a" type="radio" style={{ position: 'relative', top: 1, marginRight: 6 }} />
              不合格
            </li>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>政审时间</span>
              <input value={utils.Translate.toShortDate(this.state.happenDate) } onClick={this.onCalendarClick.bind(this) } type="text" className="m2fm_int m2fm_int2 m2fm_int10" />
              {happenDateEl}
            </li>
          </ul>
        </div>
        <div className="m2btnBox2" style={{ paddingLeft: 145 }}>
          <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
          <a href="javascript:;" className="m2btn_a2" onClick={this.props.openMain.bind(this, 'list', null) }>取 消</a>
        </div>
      </div>
    )
  }
}
