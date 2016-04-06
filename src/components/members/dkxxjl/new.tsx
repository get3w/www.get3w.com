import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as Upload from 'rc-upload'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  org: models.Org
  lr: models.LearnRecord
  onClose: Function
  onMainChange: (mainType: string, lr: models.LearnRecord) => void
}

interface S {
  lr: models.LearnRecord
  isStartTime: boolean
  isEndTime: boolean
}

export default class New extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      lr: props.lr || new models.LearnRecord(),
      isStartTime: false,
      isEndTime: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      lr: nextProps.lr || new models.LearnRecord(),
      isStartTime: false,
      isEndTime: false
    })
  }

  onChange(name: string, e) {
    if (name === 'classHour') {
      this.state.lr[name] = utils.Translate.toNumber(e.target.value)
    } else {
      this.state.lr[name] = e.target.value
    }
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    const lr = this.state.lr

    utils.DOM.loading(true)
    lr.userName = this.props.user.userName
    lr.orgID = this.props.org.id
    if (this.props.lr) {
      client.learnRecoreds.edit(lr, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onMainChange("list", lr)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      client.learnRecoreds.create(lr, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          const summary = this.props.user.orgName + ' 参加党课学习'
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onCalendarSelect(name: string, date: Date, e) {

    this.state.lr[name] = date
    this.state.isStartTime = this.state.isEndTime = false
    this.setState(this.state);
  }

  onCalendarClick(name, e) {
    this.state[name] = !this.state[name]
    this.setState(this.state)
  }

  render() {
    const title = this.props.lr ? "修改党课学习记录" : "新增党课学习记录"
    const lr = this.state.lr

    let startTimeEl = null
    if (this.state.isStartTime) {
      startTimeEl = (
        <div style={{position: "absolute", right: "100px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startTime")} />
        </div>
      )
    }

    let endTimeEl = null
    if (this.state.isEndTime) {
      endTimeEl = (
        <div style={{position: "absolute", right: "100px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endTime")} />
        </div>
      )
    }

    const props = null

    const attachmentEl = []
    if (lr.attachmentPaths) {
      lr.attachmentPaths.split(',').forEach((path: string) => {
        if (path) {
          attachmentEl.push(<a key={path} target="_blank">{path}</a>)
        }
      })
    }

    return (
      <div className="layerCon1" style={{ width: "518px", height: "494px", marginLeft: "-259px", marginTop: "-247px" }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
        <div className="layer_t">{title}</div>
        <div className="m2nadBox" style= {{ paddingTop: "3 0px" }}>
          <ul>
            <li>
              <span className="lay_s1">开始时间</span>
              <input value={utils.Translate.toShortDate(lr.startTime)} onClick={this.onCalendarClick.bind(this, "isStartTime")} onChange={this.onChange.bind(this, "startTime")} type="text" className="m2fm_int m2fm_int2 m2fm_int10" name="" />
              {startTimeEl}
            </li>
            <li>
              <span className="lay_s1">结束时间</span>
              <input value={utils.Translate.toShortDate(lr.endTime)} onClick={this.onCalendarClick.bind(this, "isEndTime")} onChange={this.onChange.bind(this, "endTime")} type="text" className="m2fm_int m2fm_int2 m2fm_int10" name="" />
              {endTimeEl}
            </li>
            <li>
              <span className="lay_s1">地 点</span>
              <input value={lr.place} onChange={this.onChange.bind(this, 'place')} type="text" className="m2fm_int m2fm_int10" name="" />
            </li>
            <li>
              <span className="lay_s1">课程名称</span>
              <input value={lr.lectureName} onChange={this.onChange.bind(this, 'lectureName')} type="text" className="m2fm_int m2fm_int10" name="" />
            </li>
            <li>
              <span className="lay_s1">课 时</span>
              <input value={lr.classHour ? lr.classHour.toString(): ""} onChange={this.onChange.bind(this, 'classHour')} type="text" className="m2fm_int m2fm_int10" name="" />
            </li>
            <li>
              <span className="lay_s1">结业证书</span>
              <Upload {...props}><a href="javascript:;" className="lay_upload fl">上传</a></Upload>
              <br />
              {attachmentEl}
            </li>
          </ul>
        </div>
        <div className="m2btnBox2">
          <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onMainChange.bind(this, 'list') } href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
