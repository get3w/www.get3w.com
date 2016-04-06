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
  onMain: (isEdit: boolean) => void
}

interface S {
  user: models.User
  controls: {[index: string]: boolean}
}

export default class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      controls: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      user: nextProps.user,
      controls: {}
    })
  }

  onChange(name: string, e) {
    this.state.user[name] = e.target.value
    this.setState(this.state);
  }

  onValueChange(name: string, value: string, e) {
    this.state.user[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {

    const dateStr = utils.Translate.toShortDate(date)
    this.state.user[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  render() {
    const user = this.state.user

    if (!user.applyPartyDate) user.applyPartyDate = new Date()
    let applyCalendarEl = null
    if (this.state.controls['applyPartyDate']) {
      applyCalendarEl = (
        <div style={{ position: "absolute", left: "50%" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'applyPartyDate') } />
        </div>
      )
    }
    let workingHoursCalendarEl = null
    if (this.state.controls['workingHours']) {
      workingHoursCalendarEl = (
        <div style={{ position: "absolute", left: "50%" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'workingHours') } />
        </div>
      )
    }
    let birthDayCalendarEl = null
    if (this.state.controls['birthDay']) {
      birthDayCalendarEl = (
        <div style={{ position: "absolute", left: "50%" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'birthDay') } />
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm_u1 m2per_u4 m2per_u7">
          <ul>
            <li>
              <span className="m2fm_us1">籍贯：</span>
              <div className="m2fm_selContent" style={{ position: "relative", paddingRight: "1px", float: "left", marginRight: "6px" }}>
                <input onClick={this.onClick.bind(this, "nativePlace") } value={user.nativePlace} type="text" className="m2fm_int m2fm_int3" placeholder="全部" />
                <div className="m2fm_selBox" style={{ display: this.state.controls['nativePlace'] ? "block" : "none" }}>
                  <dl>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "北京市") }>北京市</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "天津市") }>天津市</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "重庆市") }>重庆市</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "上海市") }>上海市</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "河北省") }>河北省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "山西省") }>山西省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "辽宁省") }>辽宁省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "吉林省") }>吉林省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "黑龙江省") }>黑龙江省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "江苏省") }>江苏省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "浙江省") }>浙江省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "安徽省") }>安徽省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "福建省") }>福建省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "江西省") }>江西省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "山东省") }>山东省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "河南省") }>河南省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "湖北省") }>湖北省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "湖南省") }>湖南省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "广东省") }>广东省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "海南省") }>海南省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "四川省") }>四川省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "贵州省") }>贵州省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "云南省") }>云南省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "陕西省") }>陕西省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "甘肃省") }>甘肃省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "青海省") }>青海省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "台湾省") }>台湾省</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "内蒙古自治区") }>内蒙古自治区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "广西壮族自治区") }>广西壮族自治区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "西藏自治区") }>西藏自治区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "宁夏回族自治区") }>宁夏回族自治区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "新疆维吾尔自治区") }>新疆维吾尔自治区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "香港特别行政区") }>香港特别行政区</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "澳门特别行政区") }>澳门特别行政区</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <span className="m2fm_us1">出生地：</span>
              <input value={user.placeBirth} onChange={this.onChange.bind(this, 'placeBirth') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">户口所在地：</span>
              <input value={user.registeredResidence} onChange={this.onChange.bind(this, 'registeredResidence') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">家庭住址：</span>
              <input value={user.homeAddress} onChange={this.onChange.bind(this, 'homeAddress') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">学位：</span>
              <div className="m2fm_selContent" style={{ position: "relative", paddingRight: "1px", float: "left", marginRight: "6px" }}>
                <input onClick={this.onClick.bind(this, "degree") } value={user.degree} type="text" className="m2fm_int m2fm_int3" placeholder="全部" />
                <div className="m2fm_selBox" style={{ display: this.state.controls['degree'] ? "block" : "none" }}>
                  <dl>
                  <dd onClick={this.onValueChange.bind(this, "degree", "博士") }>博士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "硕士") }>硕士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "学士") }>学士</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <span className="m2fm_us1">婚姻状况：</span>
              <div className="m2fm_selContent" style={{ position: "relative", paddingRight: "1px", float: "left", marginRight: "6px" }}>
                <input onClick={this.onClick.bind(this, "maritalStatus") } value={user.maritalStatus} type="text" className="m2fm_int m2fm_int3" />
                <div className="m2fm_selBox" style={{ display: this.state.controls['maritalStatus'] ? "block" : "none" }}>
                  <dl>
                    <dd onClick={this.onValueChange.bind(this, "maritalStatus", "未婚") }>未婚</dd>
                    <dd onClick={this.onValueChange.bind(this, "maritalStatus", "已婚") }>已婚</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <span className="m2fm_us1">工作时间：</span>
              <input value={utils.Translate.toShortDate(user.workingHours) } onClick={this.onClick.bind(this, "workingHours") } className="m2fm_u1Int m2fm_int2" type="text" />
              {workingHoursCalendarEl}
            </li>
            <li>
              <span className="m2fm_us1">工作单位：</span>
              <input value={user.workOrganization} onChange={this.onChange.bind(this, 'workOrganization') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">邮政编码：</span>
              <input value={user.postcode} onChange={this.onChange.bind(this, 'postcode') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">技术职务：</span>
              <input value={user.technicalPositions} onChange={this.onChange.bind(this, 'technicalPositions') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">行政职务：</span>
              <input value={user.administrativeDuties} onChange={this.onChange.bind(this, 'administrativeDuties') } className="m2fm_u1Int" type="text" />
            </li>
            <li>
              <span className="m2fm_us1">备注 ：</span>
              <textarea value={user.remarks} onChange={this.onChange.bind(this, 'remarks') } className="m2fm_u1Int m2fm_u1Int2">
              </textarea>
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2per_btnBox">
          <a onClick={this.onSubmit.bind(this) } className="m2per_abtn2" href="javascript:;">提 交</a>
          <a onClick={this.props.onMain.bind(this, false) } className="m2per_abtn" href="javascript:;">返 回</a>
        </div>
      </div>
    )
  }
}
