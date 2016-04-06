import * as React from 'react'
import { Link } from 'react-router';
import * as _ from 'lodash';
import * as is from 'is_js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Upload from 'rc-upload'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'

interface P {
  userName: string
  org: models.Org
  meeting: models.Meeting
  meetingTypeID?: number
  isOrgLife: boolean
  onMainChange: (mainType: string, meeting: models.Meeting) => void
}

interface S {
  meeting: models.Meeting
  isCalendar: boolean
  isList: boolean
  isChildList: boolean
  meetingTypes: Array<models.MeetingType>
  meetingType: models.MeetingType
  childMeetingMap: { [index: number]: Array<models.MeetingType> }
  childMeetingType: models.MeetingType
  errors: { [index: string]: boolean }
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meeting: new models.Meeting(),
      isCalendar: false,
      isList: false,
      isChildList: false,
      meetingTypes: null,
      meetingType: null,
      childMeetingMap: {},
      childMeetingType: null,
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.meeting) {
      this.loadTypeList(this.props.meeting)
      // client.meetings.get(this.props.meetingID, (err: models.Error, res: models.Meeting) => {
      //   this.loadTypeList(res)
      // })
    } else {
      this.loadTypeList(null)
    }
  }

  loadTypeList(meeting: models.Meeting) {
    client.meetingTypes.listByOrgType(this.props.isOrgLife, this.props.org.orgType, (err: models.Error, res: Array<models.MeetingType>) => {
      let meetingTypes = []
      let meetingTypeID = 0
      if (!err && res) {
        meetingTypes = res
      }
      if (meeting) {
        meetingTypeID = meeting.parentMeetingTypeID
      } else if (meetingTypes.length > 0) {
        meetingTypeID = meetingTypes[0].id
      }
      this.onTypeChange(meetingTypeID, {
        meeting: meeting ? meeting : this.state.meeting,
        isCalendar: false,
        isList: false,
        isChildList: false,
        meetingTypes: meetingTypes,
        meetingType: meetingTypes[0],
        childMeetingMap: {},
        childMeetingType: null,
        errors: {}
      })
    })
  }

  onClick(isParent: boolean, e) {
    if (isParent) this.state.isList = !this.state.isList;
    if (!isParent) this.state.isChildList = !this.state.isChildList;
    this.setState(this.state)
  }

  onTypeChange(meetingTypeID: number, s: S) {
    if (!s) s = this.state
    client.meetingTypes.listByParentID(this.props.isOrgLife, meetingTypeID, this.props.org.id, (err: models.Error, res: Array<models.MeetingType>) => {
      let childMeetingMap = s.childMeetingMap
      if (!err && res) {
        childMeetingMap[meetingTypeID] = res
      }
      let meetingType = _.find(s.meetingTypes, (mt: models.MeetingType) => {
        return mt.id === meetingTypeID
      })
      let childMeetingType = _.find(res, (mt: models.MeetingType) => {
        return mt.id === s.meeting.meetingTypeID
      })
      if (!childMeetingType) {
        childMeetingType = _.find(res, (mt: models.MeetingType) => {
          return mt.id === this.props.meetingTypeID
        })
      }
      s.meeting.parentMeetingTypeID = meetingTypeID

      this.setState({
        meeting: s.meeting,
        isCalendar: s.isCalendar,
        isList: false,
        isChildList: false,
        meetingTypes: s.meetingTypes,
        meetingType: meetingType || s.meetingType,
        childMeetingMap: childMeetingMap,
        childMeetingType: childMeetingType || (res ? res[0] : null),
        errors: {}
      })
    })
  }

  onTypeChildChange(meetingTypeID: number, meetingTypeName: string) {
    const childMeetingTypes = this.state.childMeetingMap[this.state.meetingType.id]
    let childMeetingType = null
    if (childMeetingTypes) {
      childMeetingType = _.find(childMeetingTypes, (mt: models.MeetingType) => {
        return mt.id === meetingTypeID
      })
    }
    this.state.meeting.meetingTypeID = meetingTypeID
    this.state.meeting.meetingTypeName = meetingTypeName
    this.setState({
      meeting: this.state.meeting,
      isCalendar: this.state.isCalendar,
      isList: false,
      isChildList: false,
      meetingTypes: this.state.meetingTypes,
      meetingType: this.state.meetingType,
      childMeetingMap: this.state.childMeetingMap,
      childMeetingType: childMeetingType,
      errors: {}
    })
  }

  onChange(name: string, e) {
    this.state.meeting[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const meeting = this.state.meeting
    let errors = {}
    if (!meeting.meetingName) {
      errors['meetingName'] = true
    }
    if (!meeting.meetingTopics) {
      errors['meetingTopics'] = true
    }
    if (!meeting.meetingDate) {
      errors['meetingDate'] = true
    }
    if (!this.state.childMeetingType.typeName) {
      errors['typeName'] = true
    }
    if (!meeting.attend) {
      errors['attend'] = true
    }
    if (!meeting.meetingContent) {
      errors['meetingContent'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

    if (!meeting.meetingTypeID && this.state.childMeetingType) {
      meeting.meetingTypeID = this.state.childMeetingType.id
    }

    if (meeting.meetingName && meeting.meetingTypeID) {
      utils.DOM.loading(true)

      meeting.orgID = this.props.org.id
      meeting.orgName = this.props.org.orgName
      if (this.props.meeting) {
        client.meetings.edit(meeting, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            this.props.onMainChange("", meeting)
          } else {
            utils.Swal.error(err)
          }
        })
      } else {
        if (this.state.childMeetingType) {
          meeting.meetingTypeName = this.state.childMeetingType.typeName
        }
        client.meetings.create(meeting, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            this.props.onMainChange("", res)
          } else {
            utils.Swal.error(err)
          }
        })
      }
    }
  }

  onCalendarSelect(date: Date, e) {
    this.state.meeting.meetingDate = date
    this.state.isCalendar = false
    this.setState(this.state);
  }

  onCalendarClick(e) {
    this.state.isCalendar = !this.state.isCalendar
    this.setState(this.state)
  }

  render() {
    if (!this.state.meetingType) return <InnerLoading />

    let meetingTypesEl = this.state.meetingTypes.map((mt: models.MeetingType) => {
      return <dd key={mt.id} onClick={this.onTypeChange.bind(this, mt.id, null) }>{mt.typeName}</dd>
    })

    const childMeetingTypes = this.state.childMeetingMap[this.state.meetingType.id];
    let childMeetingTypesEl = null
    if (childMeetingTypes) {
      childMeetingTypesEl = childMeetingTypes.map((child: models.MeetingType) => {
        return <dd key={child.id} onClick={this.onTypeChildChange.bind(this, child.id, child.typeName) }>{child.typeName}</dd>
      })
    }

    const meeting = this.state.meeting

    let calendarEl = null
    if (this.state.isCalendar) {
      calendarEl = (
        <div style={{ position: "absolute", left: "53%", top: "36px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this) } />
        </div>
      )
    }

    const props = null

    const attachmentEl = []
    if (meeting.attachmentPath) {
      meeting.attachmentPath.split(',').forEach((path: string) => {
        if (path) {
          attachmentEl.push(<a key={path} target="_blank">{path}</a>)
        }
      })
    }

    const isDK = this.state.childMeetingType && this.state.childMeetingType.typeName === '党课'

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_bs2">{this.props.meeting ? "修改会议纪要" : "新建会议纪要"}</span>
        </div>

        <div className="m2fm_tabBox">
          <div className="m2fm_u2">
            <ul>
              <li>
                <span className="m2fm_u2nm">{isDK ? "主题" : "会议名称"}：</span>
                <input value={meeting.meetingName} onChange={this.onChange.bind(this, 'meetingName') } type="text" className={this.state.errors['meetingName'] ? 'm2fm_int error' : 'm2fm_int'} style={{ width: "650px" }} />
              </li>
              <li style={{ position: "relative" }}>
                <span className="m2fm_u2nm">{isDK ? "主讲人职务" : "会议议题"}：</span>
                <input value={meeting.meetingTopics} onChange={this.onChange.bind(this, 'meetingTopics') } type="text" className={this.state.errors['meetingTopics'] ? 'm2fm_int fl error' : 'm2fm_int fl'} style={{ width: 135 }} />
                <span className="m2fm_u2nm">{isDK ? "时间" : "会议时间"}：</span>
                <input value={utils.Translate.toShortDate(meeting.meetingDate) } onClick={this.onCalendarClick.bind(this) } onChange={this.onChange.bind(this, "meetingDate") } className={this.state.errors['meetingDate'] ? 'm2fm_int m2fm_int2 fl error' : 'm2fm_int m2fm_int2 fl'} style={{ width: 135 }} type="text" />
                {calendarEl}
              </li>
              <li style={{ display: isDK ? "none" : "block" }}>
                <span className="m2fm_u2nm">会议类型：</span>
                <div className="m2fm_selContent" style={{ display: 'none', position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                  <input onClick={this.onClick.bind(this, true) } value={this.state.meetingType.typeName} type="text" className="m2fm_int m2fm_int3" placeholder="选择会议类型" />
                  <div className="m2fm_selBox" style={{ display: this.state.isList ? "block" : "none" }}>
                    <dl>{meetingTypesEl}</dl>
                  </div>
                </div>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                  <input onClick={this.onClick.bind(this, false) } value={this.state.childMeetingType ? this.state.childMeetingType.typeName : ''} type="text" className={this.state.errors['typeName'] ? 'm2fm_int m2fm_int3 error' : 'm2fm_int m2fm_int3'} />
                  <div className="m2fm_selBox" style={{ display: this.state.isChildList ? "block" : "none" }}>
                    <dl>{childMeetingTypesEl}</dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="m2fm_u2nm">{isDK ? "地点" : "会议地点"}：</span>
                <input value={meeting.meetingPlace} onChange={this.onChange.bind(this, 'meetingPlace') } type="text" className="m2fm_int" style={{ width: "650px" }} />
              </li>
              <li>
                <span className="m2fm_u2nm">应到人数：</span>
                <input value={meeting.mustAttendNum ? meeting.mustAttendNum.toString() : ''} onChange={this.onChange.bind(this, 'mustAttendNum') } type="text" className="m2fm_int fl" style={{ width: 135 }} />
                <span className="m2fm_u2nm">实到人数：</span>
                <input value={meeting.attendNum ? meeting.attendNum.toString() : ''} onChange={this.onChange.bind(this, 'attendNum') } type="text" className="m2fm_int fl" style={{ width: 135 }} />
              </li>
              <li>
                <span className="m2fm_u2nm">{isDK ? "主讲人" : "主持人"}：</span>
                <input value={meeting.meetingCompere} onChange={this.onChange.bind(this, 'meetingCompere') } type="text" className="m2fm_int" style={{ width: "650px" }} />
              </li>
              <li>
                <span className="m2fm_u2nm">记录人：</span>
                <input value={meeting.recorderPeople} onChange={this.onChange.bind(this, 'recorderPeople') } type="text" className="m2fm_int" style={{ width: "650px" }} />
              </li>
              <li>
                <span className="m2fm_u2nm">列席人员：</span>
                <input value={meeting.mustAttend} onChange={this.onChange.bind(this, 'mustAttend') } type="text" className="m2fm_int" style={{ width: "650px" }} />
              </li>
              <li>
                <span className="m2fm_u2nm">缺席人员：</span>
                <input value={meeting.notAttend} onChange={this.onChange.bind(this, 'notAttend') } type="text" className="m2fm_int" style={{ width: "650px" }} />
              </li>
              <li>
                <span className="m2fm_u2nm">参会人员：</span>
                <textarea onChange={this.onChange.bind(this, 'attend') }  className={this.state.errors['attend'] ? 'm2fm_int fl error' : 'm2fm_int fl'} style={{ width: "650px", height: "60px", padding: '8px 10px', lineHeight: "20px" }} value={meeting.attend}></textarea><div className="clear" />
              </li>
              <li>
                <span className="m2fm_u2nm">{isDK ? "内容" : "会议内容"}：</span>
                <textarea onChange={this.onChange.bind(this, 'meetingContent') } className={this.state.errors['meetingContent'] ? 'm2fm_int fl error' : 'm2fm_int fl'} style={{ width: "650px", height: "100px", padding: '8px 10px', lineHeight: "20px" }} value={meeting.meetingContent}></textarea><div className="clear" />
              </li>
              <li style={{ display: isDK ? "none" : "block" }}>
                <span className="m2fm_u2nm">会议决议：</span>
                <textarea onChange={this.onChange.bind(this, 'meetingResolution') } className="m2fm_int fl" style={{ width: "650px", height: "60px", padding: '8px 10px', lineHeight: "20px" }} value={meeting.meetingResolution}></textarea><div className="clear" />
              </li>
              <li>
                <span className="m2fm_u2nm">附件：</span>
                <Upload {...props}><a href="javascript:;" className="m2fm_u2upload">上传附件</a></Upload>
              </li>
              <li>
                <span className="m2fm_u2nm">&nbsp; </span>
                {attachmentEl}
              </li>
            </ul>
          </div>
          <div className="m2fm_sbxBtn">
            <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">提 交</a>
            <a onClick={this.props.onMainChange.bind(this, "", null) } href="javascript:;" className="m2btn_a2">取 消</a>
          </div>
        </div>

      </div>
    )
  }
}
