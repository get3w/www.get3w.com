import * as React from 'react'
import * as _ from 'lodash'
import * as is from 'is_js'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as constants from '../../../constants';
import Add from '../../meetings/add'

interface P {
  org: models.Org
  user: models.User
  eh: models.ElectionHistory
  onClose: Function
}

interface S {
  eh: models.ElectionHistory
  meetings: Array<models.Meeting>
  meeting: models.Meeting
  isCalendar: boolean
  isElectionForms: boolean
  isList: boolean
  isAddMeeting: boolean
  isSuccess: boolean
  isSuccessConfirm: boolean
  errors: { [index: string]: boolean }
}

export default class HJXJXZ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      eh: this.props.eh || new models.ElectionHistory(),
      meetings: null,
      meeting: null,
      isCalendar: false,
      isElectionForms: false,
      isList: false,
      isAddMeeting: false,
      isSuccess: false,
      isSuccessConfirm: false,
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      eh: nextProps.eh || new models.ElectionHistory(),
      meetings: null,
      meeting: null,
      isCalendar: false,
      isElectionForms: false,
      isList: false,
      isAddMeeting: false,
      isSuccess: false,
      isSuccessConfirm: false,
      errors: {}
    })
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
    this.state.eh.meetingID = this.state.meeting.id
    this.state.eh.meetingName = this.state.meeting.meetingName
    this.setState(this.state)
  }

  onAddMeetingClick(e) {
    this.state.isAddMeeting = true
    this.setState(this.state)
  }

  onAddMeetingCancelClick(mainType: string, meeting: models.Meeting, e) {
    this.state.isAddMeeting = false
    this.state.meeting = meeting
    this.state.eh.meetingID = meeting.id
    this.state.eh.meetingName = meeting.meetingName
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state.eh[name] = e.target.value
    this.setState(this.state);
  }
  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const eh = this.state.eh
    let errors = {}
    if (!eh.meetingName) {
      errors['meetingName'] = true
    }
    if (!eh.periodNum || isNaN(eh.periodNum)) {
      errors['periodNum'] = true
    }
    if (!eh.happenDate) {
      errors['happenDate'] = true
    }
    if (!eh.electionForms) {
      errors['electionForms'] = true
    }
    if (!eh.content) {
      errors['content'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

    utils.DOM.loading(true)

    if (this.props.eh) {
      client.electionHistories.edit(eh, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose(true)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      eh.orgID = this.props.org.id
      eh.orgName = this.props.org.orgName
      client.electionHistories.create(eh, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.state.isSuccess = true
          this.setState(this.state)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  render() {
    const eh = this.state.eh
    const title = this.props.eh ? '修改换届记录' : '新增换届记录'

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
    } else if (this.state.isSuccess) {
      mainEl = (
        <div className="layerCon1" style={{ height: 340, width: 518, marginLeft: '-259px', marginTop: '-170px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: 30, paddingBottom: 10 }}>
            <ul>
              <li>
                <input onClick={ (e) => {
                  this.state.isSuccessConfirm = true
                  this.setState(this.state)
                }} checked={this.state.isSuccessConfirm} name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
                是　　将上一届所有领导成员自动转为往届领导
              </li>
              <li>
                <input onClick={ (e) => {
                  this.state.isSuccessConfirm = false
                  this.setState(this.state)
                }} checked={!this.state.isSuccessConfirm} name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
                否　　回到换届选举列表界面
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingLeft: 145 }}>
            <a href="javascript:;" className="m2btn_a1" onClick={ (e) => {
              if (this.state.isSuccessConfirm) {
                client.orgLeaders.updateIsCurrent(this.props.org.id, () => {
                  browserHistory.push(constants.Links.ORGS_LD)
                })
              } else {
                this.props.onClose(true)
              }
            }}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>
      )
    } else {
      let calendarEl = null
      if (this.state.isCalendar) {
        calendarEl = (
          <div style={{ position: "absolute", left: "35%", marginTop: "0" }}>
            <RCCalendar locale={LOCALE} onSelect={ (date: Date, e) => {
              this.state.isCalendar = false
              this.state.eh.happenDate = date
              this.setState(this.state);
            }} />
          </div>
        )
      }

      let listEl = null
      if (this.state.isList && this.state.meetings) {
        const meetingsEl = this.state.meetings.map((meeting: models.Meeting) => {
          return (
            <tr key={meeting.id}>
              <td style={{ textAlign: "center" }}>
                <input className="lay-rad" name="a" onClick={this.onMeetingChange.bind(this, meeting) } type="radio" value="" />
              </td>
              <td><a onClick={this.onMeetingChange.bind(this, meeting) } href="javascript:;" className="cor_red">{meeting.meetingName}</a>
              </td>
              <td>{utils.Translate.toShortDate(meeting.meetingDate) }</td>
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

      mainEl = (
        <div className="layerCon1" style={{ width: "646px", height: "490px", marginLeft: "-323px", marginTop: "-245px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) } />
          <div className="layer_t">
            <div className="center">{title}</div>
          </div>
          <div className="m2nadBox m2per_boxUl m2nadBox2">
            <div className="m2nad_ss">当前组织：{this.props.org.orgName}</div>
            <ul>
              <li>
                <span className="lay_s1" style={{ width: "117px" }}>会议名称</span>
                <div className="m2fm_selContent" style={{ position: "relative", float: "left", marginRight: "10px" }}>
                  <input onClick={this.onMeetingClick.bind(this) }  onChange={this.onMeetingChange.bind(this) } value={this.state.eh.meetingName} type="text" className={this.state.errors['meetingName'] ? 'm2fm_int m2fm_int3 error' : 'm2fm_int m2fm_int3'}  style={{ width: "155px" }} placeholder="请选择" />
                </div>
                <a onClick={this.onAddMeetingClick.bind(this) } href="javascript:;" className="m2fm_pubBtn2">新建会议纪要</a>
                {listEl}
              </li>
              <li>
                <span className="lay_s1">界数</span>
                <input value={this.state.eh.periodNum ? this.state.eh.periodNum + '' : ''} onChange={this.onChange.bind(this, 'periodNum')} type="text" className={this.state.errors['periodNum'] ? 'm2fm_int error' : 'm2fm_int'}  style={{ float: "left", marginRight: "10px", width: "91px" }} />
                <span className="lay_s1">任期年限</span>
                <input value={this.state.eh.serviceLife ? this.state.eh.serviceLife + '' : ''} onChange={this.onChange.bind(this, 'serviceLife')} type="text" className={this.state.errors['serviceLife'] ? 'm2fm_int error' : 'm2fm_int'} style={{ float: "left", marginRight: "10px", width: "91px" }} />
                <span className="lay_s1">换届时间</span>
                <input value={utils.Translate.toShortDate(this.state.eh.happenDate)} onClick={ (e) => {
                  this.state.isCalendar = !this.state.isCalendar
                  this.setState(this.state)
                }} type="text" className={this.state.errors['happenDate'] ? 'm2fm_int error' : 'm2fm_int'} style={{ float: "left", marginRight: "10px", width: "91px" }} />
                {calendarEl}
              </li>
              <li>
                <span className="lay_s1">选举形式</span>
                <div className="m2fm_selContent" style={{ position: "relative", paddingRight: "1px", float: "left", marginRight: "6px" }}>
                  <input value={this.state.eh.electionForms} onClick={ () => { this.state.isElectionForms = !this.state.isElectionForms; this.setState(this.state) }} type="text" className={this.state.errors['electionForms'] ? 'm2fm_int m2fm_int3 error' : 'm2fm_int m2fm_int3'} style={{ width: "120px" }} placeholder="全部" />
                  <div className="m2fm_selBox" style={{ width: "140px", display: this.state.isElectionForms ? "block" : "none" }}>
                    <dl>
                      <dd onClick={ (e) => { this.state.eh.electionForms = '党员大会'; this.state.isElectionForms = false; this.setState(this.state) } }> 党员大会</dd>
                      <dd onClick={ (e) => { this.state.eh.electionForms = '党员代表大会'; this.state.isElectionForms = false; this.setState(this.state) } }> 党员代表大会</dd>
                    </dl>
                  </div>
                </div>
                <span className="lay_s1">应到会人数</span>
                <input value={this.state.eh.mustAttendNum ? this.state.eh.mustAttendNum + '' : ''} onChange={this.onChange.bind(this, 'mustAttendNum')} type="text" className="m2fm_int" style={{ float: "left", marginRight: "10px", width: "50px" }} name="" />
                <span className="lay_s1">实到会人数</span>
                <input value={this.state.eh.attendNum ? this.state.eh.attendNum + '' : ''} onChange={this.onChange.bind(this, 'attendNum')} type="text" className="m2fm_int" style={{ float: "left", marginRight: "10px", width: "50px" }} name="" />
              </li>
              <li style={{ height: "80px" }}>
                <span className="lay_s1">选举情况</span>
                <textarea value={this.state.eh.content} onChange={this.onChange.bind(this, 'content')} className={this.state.errors['content'] ? 'm2fm_int m2fm_int10 error' : 'm2fm_int m2fm_int10'} style={{ padding: "5px 10px", lineHeight: "20px", height: "80px", width: "441px" }}>
                </textarea>
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingTop: "35px", paddingLeft: "0", textAlign: "center" }}>
            <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">确 定</a>
            <a onClick={this.props.onClose.bind(this) } href="javascript:;" className="m2btn_a2">取 消</a>
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
