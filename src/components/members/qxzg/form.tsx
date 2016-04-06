import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import * as constants from '../../../constants';
import Add from '../../meetings/add'

interface P {
  user: models.User
  org: models.Org
  onClose: Function
}

interface S {
  user: models.User
  isList: boolean
  isCalendar: boolean
  meetings: Array<models.Meeting>
  meeting: models.Meeting
  isAddMeeting: boolean
}

export default class QXZG extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      isList: false,
      isCalendar: false,
      meetings: null,
      meeting: null,
      isAddMeeting: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      user: nextProps.user,
      isList: false,
      isCalendar: false,
      meetings: null,
      meeting: null,
      isAddMeeting: false
    })
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const user = this.state.user
    
  }

  onMeetingClick(e) {
    utils.DOM.prevent(e)
    if (this.state.isList) {
      this.state.isList = false
      this.setState(this.state)
    } else {
      utils.DOM.loading(true)
      client.meetings.list(this.props.org.id, constants.MeetingTypeID_DYFZ, (err, res) => {
        utils.DOM.loading(false)
        this.state.meetings = res
        this.state.isList = true
        this.setState(this.state)
      })
    }
  }

  onMeetingChange(meeting: models.Meeting, e) {
    utils.DOM.prevent(e)
    this.state.meeting = meeting
    this.state.isList = false
    this.setState(this.state)
  }

  onCalendarClick(e) {
    this.state.isCalendar = !this.state.isCalendar
    this.setState(this.state);
  }

  onCalendarSelect(date: Date, e) {

    this.state.isCalendar = false
    this.state.user.disqualificationDate = date
    this.setState(this.state);
  }

  onAddMeetingClick(e) {
    this.state.isAddMeeting = true
    this.setState(this.state)
  }

  onAddMeetingCancelClick(mainType: string, meeting: models.Meeting, e) {
    this.state.isAddMeeting = false
    this.state.meeting = meeting
    this.setState(this.state)
  }

  render() {
    const user = this.state.user

    const title = '将' + user.displayName + '取消预备党员资格'

    let listEl = null
    if (this.state.isList && this.state.meetings) {
      const meetingsEl = this.state.meetings.map((meeting: models.Meeting) => {
        return (
          <tr key={meeting.id}>
            <td style={{textAlign: "center"}}>
              <input className="lay-rad" name="a" onClick={this.onMeetingChange.bind(this, meeting)} type="radio" value="" />
            </td>
            <td><a onClick={this.onMeetingChange.bind(this, meeting)} href="javascript:;" className="cor_red">{meeting.meetingName}</a>
            </td>
            <td>{utils.Translate.toShortDate(meeting.meetingDate)}</td>
            <td>{meeting.orgName}</td>
          </tr>
        )
      })
      listEl = (
        <div className="layer_sbbx3">
          <table className="layer_tab2" width="100%">
            <tbody>
              <tr className="layer_th2">
                <td width="8%"></td>
                <td>会议名称</td>
                <td>会议时间</td>
                <td>组织名称</td>
              </tr>
              {meetingsEl}
            </tbody>
          </table>
        </div>
      )
    }

    let calendarEl = null
    if (this.state.isCalendar) {
      calendarEl = (
        <div style={{position: "absolute", left: "35%", marginTop: "0"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this)} />
        </div>
      )
    }

    let mainEl = null
    if (this.state.isAddMeeting) {
      mainEl = (
        <div className="layerCon1 layerCon3 layerCon3b" style={{
          height: "80%",
          width: "1000px",
          marginTop: "10px",
          marginLeft: "-500px",
          position: "fixed",
          top: "0"
        }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="main2" style={{ overflow: "scroll", height: "100%", width: "960px", padding: "20px 20px 20px" }}>
            <Add
              isOrgLife={false}
              userName={this.props.user.userName}
              org={this.props.org}
              meeting={null}
              onMainChange={this.onAddMeetingCancelClick.bind(this) } />
          </div>
        </div>
      )
    } else {
      mainEl = (
        <div className="layerCon1 layerCon3 layerCon3b">
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: "45px" }}>
            <ul>
              <li><span className="lay_s1" style={{ width: "117px" }}>会议名称</span>
                <div className="m2fm_selContent" style={{ position: "relative", float: "left", marginRight: "10px" }}>
                  <input onClick={this.onMeetingClick.bind(this) } onChange={this.onMeetingChange.bind(this) } value={this.state.meeting ? this.state.meeting.meetingName : ''} type="text" className="m2fm_int m2fm_int3" style={{ width: "155px" }} placeholder="请选择" />
                </div>
                <a onClick={this.onAddMeetingClick.bind(this) } href="javascript:;" className="m2fm_pubBtn2">新建会议纪要</a>
                {listEl}
              </li>
              <li>
                <span className="lay_s1" style={{ width: "117px" }}>取消时间</span>
                <input value={utils.Translate.toShortDate(this.state.user.disqualificationDate) } onClick={this.onCalendarClick.bind(this) } type="text" className="m2fm_int m2fm_int2 m2fm_int10" style={{ width: "255px" }} name="" />
                {calendarEl}
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
