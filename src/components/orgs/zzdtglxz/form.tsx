import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import UEditor from '../../../lib/components/ueditor';

interface P {
  org: models.Org
  oa: models.OrgActivity
  onClose: (isReload: boolean) => void
}

interface S {
  oa: models.OrgActivity
  isCalendar: boolean
  editorID: string
}

export default class ZZDTGLXZ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      oa: this.props.oa || new models.OrgActivity(),
      isCalendar: false,
      editorID: 'editor-' + Math.random()
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      oa: nextProps.oa || new models.OrgActivity(),
      isCalendar: false,
      editorID: 'editor-' + Math.random()
    })
  }

  onChange(name: string, e) {
    this.state.oa[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)

    this.state.oa.content = UE.getEditor(this.state.editorID).getContent();

    const oa = this.state.oa
    if (this.props.oa) {
      client.orgActivities.edit(oa, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose(true)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      oa.orgID = this.props.org.id
      oa.orgName = this.props.org.orgName
      client.orgActivities.create(oa, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose(true)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onCalendarSelect(date: Date, e) {
    this.state.isCalendar = false
    this.state.oa.addDate = date
    this.setState(this.state);
  }

  render() {
    const oa = this.state.oa
    const title = this.props.oa ? '编辑组织动态' : '新建组织动态'

    let addDateEl = null
    if (this.state.isCalendar) {
      addDateEl = (
        <div style={{position: "absolute", left: "25%"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this)} />
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ height: "95%", width: "80%", marginLeft: '-40%', top: "165px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) } />
          <div className="layer_t">{title}</div>
          <div className="m2nadBox">
            <ul>
              <li>
                <span className="lay_s1" style={{ width: 72 }}>标 题</span>
                <input value={oa.title} onChange={this.onChange.bind(this, "title")} type="text" className="m2fm_int m2fm_int10" />
              </li>
              <li>
                <span className="lay_s1" style={{ width: 72 }}>时 间</span>
                <input value={utils.Translate.toShortDate(this.state.oa.addDate)} onClick={ (e) => {
                  this.state.isCalendar = !this.state.isCalendar
                  this.setState(this.state)
                }} type="text" className="m2fm_int m2fm_int2 m2fm_int10" />
                {addDateEl}
              </li>
              <li>
                <span className="lay_s1" style={{ width: 72 }}>内容属性</span>
                <input onClick={(e) => {
                  this.state.oa.isTop = !!!this.state.oa.isTop
                  this.setState(this.state)
                }} checked={this.state.oa.isTop} className="lay-rad" type="checkbox" style={{ position: 'relative', top: 1, marginRight: 6 }} /> 置顶
              </li>
              <li style={{height: "auto"}}>
                <UEditor id={this.state.editorID} height={200} value={oa.content} />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2 center" style={{padding: 0}}>
            <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">确 定</a>
            <a onClick={this.props.onClose.bind(this) } href="javascript:;" className="m2btn_a2">取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
