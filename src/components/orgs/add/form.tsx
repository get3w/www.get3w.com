import * as React from 'react'
import * as _ from 'lodash'
import * as is from 'is_js'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  parentOrg: models.Org
  onClose: Function
}

interface S {
  org: models.Org
  controls: {[index: string]: boolean}
  errors: { [index: string]: boolean }
}

export default class Form extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      org: this.props.org || new models.Org(),
      controls: {},
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      org: nextProps.org || new models.Org(),
      controls: {},
      errors: {}
    })
  }

  onChange(name: string, e) {
    this.state.org[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    let errors = {}
    if (!this.state.org.orgName) {
      errors['orgName'] = true
    }
    if (!this.state.org.orgType) {
      errors['orgType'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

    const org = this.state.org
    if (org.orgName) {
      utils.DOM.loading(true)
      if (this.props.org) {
        client.orgs.edit(org, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push(links.ORGS)
          } else {
            utils.Swal.error(err)
          }
        })
      } else {
        org.parentID = this.props.parentOrg.id
        client.orgs.create(org, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push(links.ORGS)
          } else {
            utils.Swal.error(err)
          }
        })
      }
    }
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onValueChange(name: string, value: string, e) {
    this.state.org[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {
    
    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = !this.state.controls[name]
    this.state.org[name] = dateStr
    this.setState(this.state);
  }

  render() {
    const org = this.state.org
    const title = this.props.org ? '编辑党组织' : '新建党组织'

    let orgTypeListEl = []
    let i = 0
    if (this.props.parentOrg.orgType === '集团党组') {
      orgTypeListEl.push(<dd key={i++} onClick={this.onValueChange.bind(this, "orgType", "地方党组") }>地方党组</dd>)
    }
    if (this.props.parentOrg.orgType === '集团党组' || this.props.parentOrg.orgType === '地方党组') {
      orgTypeListEl.push(<dd key={i++} onClick={this.onValueChange.bind(this, "orgType", "直属党委") }>直属党委</dd>)
    }
    if (this.props.parentOrg.orgType === '地方党组') {
      orgTypeListEl.push(<dd key={i++} onClick={this.onValueChange.bind(this, "orgType", "地方党委") }>地方党委</dd>)
    }
    if (this.props.parentOrg.orgType === '地方党委' || this.props.parentOrg.orgType === '直属党委') {
      orgTypeListEl.push(<dd key={i++} onClick={this.onValueChange.bind(this, "orgType", "党总支") }>党总支</dd>)
    }
    if (this.props.parentOrg.orgType === '地方党委' || this.props.parentOrg.orgType === '直属党委' || this.props.parentOrg.orgType === '党总支') {
      orgTypeListEl.push(<dd key={i++} onClick={this.onValueChange.bind(this, "orgType", "党支部") }>党支部</dd>)
    }

    let createDateEl = null
    if (this.state.controls['createDate']) {
      createDateEl = (
        <div style={{position: "absolute", left: "25%"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "createDate")} />
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3a">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox">
            <ul>
              <li>
                <span className="lay_s1">上级组织名称</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.parentOrg.orgName}</span>
              </li>
              <li>
                <span className="lay_s1">上级组织代码</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.parentOrg.code}</span>
              </li>
              <li>
                <span className="lay_s1">组织名称</span>
                <input value={org.orgName} onChange={this.onChange.bind(this, "orgName")} type="text" className={this.state.errors['orgName'] ? 'm2fm_int m2fm_int10 error' : 'm2fm_int m2fm_int10'}  name="" />
              </li>
              <li>
                <span className="lay_s1">组织类型</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "orgType") } value={this.state.org.orgType} className={this.state.errors['orgType'] ? 'm2fm_int m2fm_int3 error' : 'm2fm_int m2fm_int3'}  placeholder="全部" />
                  <div className="m2fm_selBox" style={{position: "absolute", top: "30px", left: "0", display: this.state.controls["orgType"] ? "block" : "none"}}>
                    <dl>{orgTypeListEl}</dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="lay_s1">建立日期</span>
                <input value={utils.Translate.toShortDate(this.state.org.createDate)} onClick={this.onClick.bind(this,"createDate")} type="text" name="" className="m2fm_int m2fm_int2 m2fm_int10" />
                {createDateEl}
              </li>
              <li>
                <span className="lay_s1">联系电话</span>
                <input value={org.tel} onChange={this.onChange.bind(this, "tel")} type="text" className="m2fm_int m2fm_int10" name="" />
              </li>
              <li>
                <span className="lay_s1">通讯地址</span>
                <input value={org.address} onChange={this.onChange.bind(this, "address")} type="text" className="m2fm_int m2fm_int10" name="" />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}

// <li>
//   <span className="lay_s1">党组织编码</span>
//   <span className="lay_s1a">{this.props.parentOrg.code + (Math.random() * 1000 + '').substr(0, 3)}</span>
// </li>
