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
  isGraduationDate: boolean
  fileUrl: string
}

export default class Uploader extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      lr: props.lr,
      isGraduationDate: false,
      fileUrl: ''
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      lr: nextProps.lr,
      isGraduationDate: false,
      fileUrl: ''
    })
  }

  onChange(name: string, e) {
    this.state.lr[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const lr = this.state.lr

    utils.DOM.loading(true)
    client.learnRecoreds.edit(lr, (err, res) => {
      utils.DOM.loading(false)
      if (!err) {
        this.props.onMainChange("list", lr)
      } else {
        utils.Swal.error(err)
      }
    })
  }

  onCalendarSelect(date: Date, e) {
    this.state.lr.graduationDate = date
    this.state.isGraduationDate = false
    this.setState(this.state)
  }

  onCalendarClick(e) {
    this.state.isGraduationDate = !this.state.isGraduationDate
    this.setState(this.state)
  }

  render() {
    const lr = this.state.lr

    let graduationDateEl = null
    if (this.state.isGraduationDate) {
      graduationDateEl = (
        <div style={{position: "absolute", right: "100px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this)} />
        </div>
      )
    }

    const props = null

    let attachmentEl = null
    if (this.state.fileUrl) {
      attachmentEl = <a target="_blank">{this.state.fileUrl}</a>
    }

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ width: "518px", height: "332px", marginTop: "-166px", marginLeft: "-259px" }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
        <div className="layer_t">上传结业证书</div>
        <div className="m2nadBox" style={{ paddingTop: "40px" }}>
          <ul>
            <li>
              <span className="lay_s1" style={{ width: "60px" }}>结业时间</span>
              <input value={utils.Translate.toShortDate(lr.graduationDate)} onClick={this.onCalendarClick.bind(this)} onChange={this.onChange.bind(this)} type="text" className="m2fm_int m2fm_int2 m2fm_int10" style={{ width: "295px" }} name="" />
              {graduationDateEl}
            </li>
          </ul>
        </div>
        <Upload {...props}><a href="javascript:;" className="layer_btn2"></a></Upload>
        <div className="center">{attachmentEl}</div>
        <div className="m2btnBox2 m2btnBox2a" style={{ paddingTop: "25px" }}>
          <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onMainChange.bind(this, 'list') } href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
