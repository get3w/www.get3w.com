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
  isDead: boolean
  remarks: string
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCalendar: false,
      happenDate: new Date(),
      isDead: false,
      remarks: '',
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
      isDead: record ? (record.remarks === '死亡') : false,
      remarks: record ? record.remarks : '',
    })
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onRadioClick(value: boolean, e) {
    this.state.isDead = value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)

    const type2 = this.state.isDead ? "死亡" : "开除党籍"
    const summary = this.props.org.orgName + ' 党员变动(' + type2 + ')'
    this.props.user.partyMemberState = type2
    if (this.state.isDead) {
      this.props.user.deadDate = this.state.happenDate
    } else {
      this.props.user.expulsionFromThePartyDate = this.state.happenDate
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
    let happenDateEl = null
    if (this.state.isCalendar) {
      happenDateEl = (
        <div style={{ position: "absolute", left: "35%", marginTop: "0" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this) } />
        </div>
      )
    }

    return (
      <div>
        <div className="m2nadBox" style={{ paddingTop: 30 }}>
          <ul>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>变动类型</span>
              <input checked={!this.state.isDead} onClick={this.onRadioClick.bind(this, false) } name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
              开除党籍&nbsp;
              <input checked={this.state.isDead} onClick={this.onRadioClick.bind(this, true) } className="lay-rad" name="a" type="radio" style={{ position: 'relative', top: 1, marginRight: 6 }} />
              死亡
            </li>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>变动时间</span>
              <input value={utils.Translate.toShortDate(this.state.happenDate) } onClick={this.onCalendarClick.bind(this) } type="text" className="m2fm_int m2fm_int2 m2fm_int10" />
              {happenDateEl}
            </li>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>备注</span>
              <textarea value={this.state.remarks} onChange={this.onChange.bind(this, 'remarks')} type="text" className="m2fm_int" style={{ width: "270px", height: "50px", float: 'left', marginRight: 10 }}></textarea>
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
