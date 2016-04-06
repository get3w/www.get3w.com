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
  org: models.Org
  onClose: Function
}

interface S {
  isCalendar: boolean
  calendarDate: Date
  records: Array<models.Record>
}

export default class YCYBQ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCalendar: false,
      calendarDate: new Date(),
      records: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.user.userName)
  }

  componentDidMount() {
    this.load(this.props.user.userName)
  }

  load(userName: string) {
    client.records.search(userName, '延长预备期', (err: models.Error, res: Array<models.Record>) => {
      this.state.records = res
      this.setState(this.state)
    })
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    
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
    const title = '延长预备期'

    let i = 1
    let listEl = []
    this.state.records.forEach((r: models.Record) => {
      if (i++ != 1) {
        listEl.push(
          <tr>
            <td className="center">{i}</td>
            <td className="center">{utils.Translate.toShortDate(r.happenDate)}</td>
            <td className="center">{r.remarks}</td>
          </tr>
        )
      }
    })

    let calendarDateEl = null
    if (this.state.isCalendar) {
      calendarDateEl = (
        <div style={{position: "absolute", left: "35%", marginTop: "0"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this)} />
        </div>
      )
    }

    let addEl = null
    if (i <= 2) {
      addEl = (
        <div className="m2fmUnm" style={{ height: 58, paddingTop: 25 }}>
          <span className="m2fm_s1" style={{ width: 141 }}>预备期截止时间</span>
          <input value={utils.Translate.toShortDate(this.state.calendarDate)} onClick={this.onCalendarClick.bind(this)} type="text" className="m2fm_int m2fm_int2 fl" style={{ width: 222 }} />
          {calendarDateEl}
          <a onClick={this.onSubmit.bind(this)} className="m2fm_pubBtn1 fl" style={{ marginTop: 3 }} href="javascript:;">延长预备期</a>
        </div>
      )
    } else {
      addEl = (
        <div className="m2fmUnm center" style={{ height: 58, paddingTop: 25 }}>
          已延长一次，不能再延长
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ width: 540, height: 378, marginLeft: '-270px', marginTop: '-189px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          {addEl}
          <div className="layer_tab3">
            <table width="100%">
              <tbody><tr className="layer_th3">
                <td width="25%" className="center">次数</td>
                <td width="40%" className="center">预备期截止时间</td>
                <td width="35%" className="center">延期时间 </td>
              </tr>
              {listEl}
              </tbody></table>
          </div>
        </div>
      </div>
    )
  }
}
