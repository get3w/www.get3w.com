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
  result: models.TestExamResult
  org: models.Org
  onMain: (mainType: string, result: models.TestExamResult) => void
  onClose: Function
}

interface S {
  controls: {[index: string]: boolean}
  meetingTypes: Array<models.MeetingType>
  meetingType: models.MeetingType
  keyword: string
  from: string
  to: string
  meetingIDs: Array<number>
  meetings: Array<models.Meeting>
}

export default class Link extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      controls: {},
      meetingTypes: null,
      meetingType: null,
      keyword: null,
      from: null,
      to: null,
      meetingIDs: [],
      meetings: []
    }
  }

  onCheck(meetingID: number, e) {
    if (meetingID === 0) {
      this.state.meetingIDs = this.state.meetings.map((meeting: models.Meeting) => {
        return meeting.id
      })
    } else {
      if (this.state.meetingIDs.indexOf(meetingID) === -1) {
        this.state.meetingIDs.push(meetingID)
      } else {
        this.state.meetingIDs.splice(this.state.meetingIDs.indexOf(meetingID), 1)
      }
    }
    this.setState(this.state);
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    if (name === 'meetingType' && !this.state.meetingTypes) {
      utils.DOM.loading(true)
      client.meetingTypes.listByOrgType(false, this.props.org.orgType, (err: models.Error, res: Array<models.MeetingType>) => {
        utils.DOM.loading(false)
        this.state.meetingTypes = res
        this.setState(this.state)
      })
    } else {
      this.setState(this.state)
    }
  }

  onSearch() {
    utils.DOM.loading(true)
    client.meetings.searchByKeyword(this.props.org.id, this.state.meetingType ? this.state.meetingType.id : 0, this.state.keyword, this.state.from, this.state.to, (err: models.Error, res: Array<models.Meeting>) => {
      utils.DOM.loading(false)
      this.state.meetings = res
      this.setState(this.state)
    })
  }

  onValueChange(meetingType: models.MeetingType) {
    this.state.meetingType = meetingType
    this.state.controls['meetingType'] = false
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state)
  }

  onCalendarSelect(name: string, date: Date, e) {
    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = !this.state.controls[name]
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onSubmit() {
    if (this.state.meetingIDs) {
      if (!this.props.result.meetingIDs) {
        this.props.result.meetingIDs = this.state.meetingIDs.join(',')
      } else {
        this.props.result.meetingIDs += ',' + this.state.meetingIDs.join(',')
      }
    }
    utils.DOM.loading(true)
    client.testExamResults.edit(this.props.result, () => {
      utils.DOM.loading(false)
      this.props.onMain('upload', this.props.result)
    })
  }

  render() {
    let meetingsEl = null
    if (this.state.meetings && this.state.meetings.length > 0) {
      const listEl = this.state.meetings.map((meeting: models.Meeting) => {
        return (
          <tr key={meeting.id}>
            <td className="center">
              <input onChange={this.onCheck.bind(this, meeting.id)} checked={this.state.meetingIDs.indexOf(meeting.id) !== -1} type="checkbox" className="lay-rad" />
            </td>
            <td className="center">{meeting.meetingTypeName}</td>
            <td className="center">{meeting.meetingName}</td>
          </tr>
        )
      })
      meetingsEl = (
        <div className="layer_tab3" style={{ marginTop: 10, height: 267 }}>
          <table width="100%">
            <tbody>
              <tr className="layer_th3">
                <td className="center">
                  <input onChange={this.onCheck.bind(this, 0)} type="checkbox" className="lay-rad" />
                </td>
                <td className="center">会议类型</td>
                <td className="center">会议名称</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
      )
    }

    let meetingTypesEl = null
    if (this.state.meetingTypes) {
      meetingTypesEl = this.state.meetingTypes.map((meetingType: models.MeetingType) => {
        return <dd key={meetingType.id} onClick={this.onValueChange.bind(this, meetingType)}>{meetingType.typeName}</dd>
      })
    }

    let fromEl = null
    let toEl = null
    if (this.state.controls['from']) {
      fromEl = (
        <div style={{ position: "absolute", left: "20%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "from") } />
        </div>
      )
    }
    if (this.state.controls['to']) {
      toEl = (
        <div style={{ position: "absolute", left: "65%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "to") } />
        </div>
      )
    }

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{height:"576px", marginTop:"-288px", position:"fixed", width:"646px", marginLeft:"-323px"}}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'list') }></i>
        <div className="layer_t">关联会议材料</div>
        <br />
        <div className="m2nadBox m2per_boxUl m2nadBox2" style={{ paddingTop: 0 }}>
          <ul>
            <li>
              <span className="lay_s1">会议类型</span>
              <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                <input onClick={this.onClick.bind(this, 'meetingType')} value={this.state.meetingType ? this.state.meetingType.typeName : '全部'} type="text" className="m2fm_int m2fm_int3" placeholder="全部" style={{ width: 126 }} />
                <div className="m2fm_selBox" style={{ display: this.state.controls['meetingType'] ? 'block' : 'none', width: 146 }}>
                  <dl>
                    <dd onClick={this.onValueChange.bind(this, null)}>全部</dd>
                    {meetingTypesEl}
                  </dl>
                </div>
              </div>
              <span className="lay_s1">会议名称</span>
              <input onChange={this.onChange.bind(this, 'keyword')} value={this.state.keyword} type="text" className="m2fm_int" style={{ float: 'left', marginRight: 10, width: 220 }} />
            </li>
            <li>
              <span className="lay_s1">会议时间</span>
              <input value={utils.Translate.toShortDate(this.state.from)} onClick={this.onClick.bind(this, "from") } type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 156 }} />
              {fromEl}
              <span className="lay_s1">至</span>
              <input value={utils.Translate.toShortDate(this.state.to)} onClick={this.onClick.bind(this, "to") } type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 156 }} />
              {toEl}

              <a onClick={this.onSearch.bind(this)} href="javascript:;" className="m2fm_pubBtn1">搜 索 </a>
            </li>
          </ul>
        </div>
        {meetingsEl}
        <div className="m2btnBox2" style={{ paddingTop: 35, paddingLeft: 0, textAlign: 'center' }}>
          <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onMain.bind(this, 'upload', this.props.result)} href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
