import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'

interface P {
  meeting: models.Meeting
  onMainChange: (mainType: string, meeting: models.Meeting) => void
}

export default class View extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  onPrintClick(e) {
    window.print()
  }

  render() {
    const meeting = this.props.meeting

    const attachmentEl = []
    if (meeting.attachmentPath) {
      meeting.attachmentPath.split(',').forEach((path: string) => {
        if (path) {
          attachmentEl.push(<a key={path} href={path} target="_blank">{path}</a>)
        }
      })
    }

    let meetingTopicsName = "会议议题"
    if (meeting.meetingTypeName === '党课') {
      meetingTopicsName = "主题"
    }

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_bs2">{meeting.meetingName}</span>
        </div>
        <div className="m2fm_tabBox">
          <div className="m2fm_u2 m2fm_u2a">
            <ul>
              <li>
                <span className="m2fm_u2nm">会议名称：</span>
                <div className="m2fm_u2txt">{meeting.meetingName}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">{meetingTopicsName}：</span>
                <div className="m2fm_u2txt">{meeting.meetingTopics}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">会议时间：</span>
                <div className="m2fm_u2txt">{utils.Translate.toShortDate(meeting.meetingDate)}　　　　　　会议类型：{meeting.meetingTypeName}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">组织名称：</span>
                <div className="m2fm_u2txt">{meeting.orgName}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">列席人员：</span>
                <div className="m2fm_u2txt">{meeting.mustAttend}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">缺席人员：</span>
                <div className="m2fm_u2txt">{meeting.notAttend}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">参会人员：</span>
                <div className="m2fm_u2txt">{meeting.attend}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">会议内容：</span>
                <div className="m2fm_u2txt m2fm_u2txt2">{meeting.meetingContent}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">会议决议：</span>
                <div className="m2fm_u2txt m2fm_u2txt2">{meeting.meetingResolution}</div>
                <div className="clear"></div>
              </li>
              <li>
                <span className="m2fm_u2nm">附件：</span>
                <div className="m2fm_u2txt">{attachmentEl}</div>
                <div className="clear"></div>
              </li>
            </ul>
          </div>
          <div className="m2fm_sbxBtn">
            <a href="javascript:;" onClick={this.onPrintClick.bind(this)} className="m2btn_a1">打 印</a>
            <a onClick={this.props.onMainChange.bind(this, "", null) } href="javascript:;" className="m2btn_a2">返 回</a>
          </div>
        </div>
      </div>
    )
  }
}
