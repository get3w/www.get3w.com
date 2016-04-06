import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
import GUIDANG from "../../components/meetings/guidang/form"

interface P {
  meetingTypeID: number
  org: models.Org
  isAdmin: boolean
  isOp: boolean
  onMainChange: (mainType: string, meeting: models.Meeting) => void
}

interface S {
  meetings: Array<models.Meeting>
  winType: string
  id: number
  searchKeyword: string
  searchFrom: string
  searchTo: string
  orgMap: {[index: number]: Array<models.Org>}
  level: number
  levelOrgMap: {[index: number]: models.Org}
  controls: {[index: string]: boolean}
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meetings: null,
      winType: '',
      id: null,
      searchKeyword: '',
      searchFrom: '',
      searchTo: '',
      orgMap: {},
      controls: {},
      level: 0,
      levelOrgMap: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps)
  }

  componentDidMount() {
    this.load(this.props)
  }

  load(p: P) {
    this.state.meetings = null
    this.setState(this.state)

    let currentOrg = p.org
    if (this.state.level > 0) {
      currentOrg = this.state.levelOrgMap[this.state.level]
    }
    console.log(currentOrg)

    if (this.state.searchKeyword || this.state.searchFrom || this.state.searchTo) {
      client.meetings.searchByKeyword(currentOrg.id, p.meetingTypeID, this.state.searchKeyword, this.state.searchFrom, this.state.searchTo, (err: models.Error, res) => {
        this.state.meetings = res
        this.setState(this.state)
      })
    } else {
      client.meetings.list(currentOrg.id, p.meetingTypeID, (err: models.Error, res) => {
        this.state.meetings = res
        this.setState(this.state)
      })
    }
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  onClose(e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
  }

  onCalendarSelect(name: string, date: Date, e) {

    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = false
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onClick(name: string, e) {
    this.state[name] = !this.state[name]
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props)
  }

  onOrgClick(org: models.Org, level: number, select: boolean) {
    if (level === 1) this.state.controls['all'] = false
    this.state.controls["org-" + (level - 1)] = false
    if (select) {
      this.state.controls["org-" + level] = false
    } else {
      this.state.controls["org-" + level] = !this.state.controls["org-" + level]
    }
    this.state.level = level
    this.state.levelOrgMap[level] = org

    if (select) {
      this.load(this.props)
    }

    let orgs = this.state.orgMap[org.id]
    if (!orgs && org.childrenCount > 0) {
      utils.DOM.loading(true)
      client.orgs.list(org.id, false, (err: models.Error, children: Array<models.Org>) => {
        utils.DOM.loading(false)
        orgs = children
        if (children && children.length > 0) {
          this.state.orgMap[org.id] = children
          this.setState(this.state)
        }
      })
    } else {
      this.setState(this.state)
    }
  }

  getOrgListEl(org: models.Org, level: number) {
    let orgs = this.state.orgMap[org.id]
    let listEl = null
    if (orgs) {
      listEl = orgs.map((o: models.Org) => {
        return <dd key={o.id} onClick={ () => {
          this.onOrgClick(o, level + 1, true)
        }}>{o.orgName}</dd>
      })
    }

    let currentOrg = null
    if (this.state.level > level) {
      currentOrg = this.state.levelOrgMap[level + 1]
    }

    return (
      <div key={org.id} className="m2fm_selContent" style={{float: "left", position: "relative", marginRight: "5px"}}>
        <input onClick={this.onOrgClick.bind(this, org, level, false)} value={currentOrg ? currentOrg.orgName : ''} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="选择机构" />
        <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", display: this.state.controls['org-' + level] ? "block" : "none" }}>
          <dl>
            {listEl}
          </dl>
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.meetings) return <InnerLoading />

    let listOpEl = null
    if (this.props.isAdmin) {
      const orgsEl = []
      for (let i = 1; i <= this.state.level; i++) {
        const org = this.state.levelOrgMap[i]
        if (org && org.childrenCount > 0) {
            orgsEl.push(this.getOrgListEl(org, i))
        }
      }

      listOpEl = (
        <tr>
          <td colSpan={8}>
            <div className="m2fm_selContent" style={{float: "left", position: "relative", marginRight: "5px"}}>
              <input onClick={()=>{
                this.state.controls['all'] = !this.state.controls['all']
                this.setState(this.state)
              }} value={this.props.org.orgName} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="选择机构" />
              <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", display: this.state.controls['all'] ? "block" : "none" }}>
                <dl>
                <dd onClick={ () => {
                  this.onOrgClick(this.props.org, 1, true)
                }}>{this.props.org.orgName}</dd>
                </dl>
              </div>
            </div>
            {orgsEl}
            <div className="right">
              <a onClick={this.props.onMainChange.bind(this, "add", null) } href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
              <img src="/assets/images/m2btn2.jpg" width="76" height="32" style={{ marginLeft: "10px" }} />
            </div>
          </td>
        </tr>
      )
    }

    const listEl = this.state.meetings.map((meeting: models.Meeting) => {
      let opEl = null
      if (!meeting.isArchive && this.props.isAdmin && meeting.orgID === this.props.org.id) {
        opEl = (
          <div className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEETING_GUIDANG, meeting.id) } className="m2fm_abtn" href="javascript:;">归档</a>
            <a onClick={this.props.onMainChange.bind(this, "add", meeting) } className="m2fm_abtn" href="javascript:;">编辑</a>
          </div>
        )
      }
      return (
        <tr key={meeting.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><a onClick={this.props.onMainChange.bind(this, "view", meeting) } href="javascript:;" className="cor_red">{meeting.meetingName}</a></td>
          <td>{meeting.orgName}</td>
          <td>{meeting.meetingTypeName}</td>
          <td>{utils.Translate.toShortDate(meeting.meetingDate) }</td>
          <td>{meeting.isArchive ? "已归档" : "未归档"}</td>
          <td className="center">
            {opEl}
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let meeting = null
      this.state.meetings.forEach((m: models.Meeting) => {
        if (this.state.id === m.id) {
          meeting = m
        }
      })
      if (this.state.winType === constants.WinTypes.MEETING_GUIDANG) {
        formEl = <GUIDANG meeting={meeting} onClose={this.onClose.bind(this) } onSuccess={this.load.bind(this, this.props.org.id) } />
      }
    }

    let searchFromEl = null
    let searchToEl = null
    if (this.state.controls['searchFrom']) {
      searchFromEl = (
        <div style={{ position: "absolute", left: "35%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchFrom") } />
        </div>
      )
    }
    if (this.state.controls['searchTo']) {
      searchToEl = (
        <div style={{ position: "absolute", left: "45%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchTo") } />
        </div>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">会议标题：</span>
          <input value={this.state.searchKeyword} onChange={this.onChange.bind(this, 'searchKeyword') } type="text" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">会议时间：</span>
          <input value={this.state.searchFrom} onClick={this.onClick.bind(this, "isSearchFrom") } onChange={this.onChange.bind(this, "isSearchFrom") } type="text" className="m2fm_int m2fm_int2" />
          {searchFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.searchTo} onClick={this.onClick.bind(this, "isSearchTo") } onChange={this.onChange.bind(this, "isSearchTo") } type="text" name="" className="m2fm_int m2fm_int2" />
          {searchToEl}
          <input onClick={this.onSearch.bind(this) } type="submit" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              {listOpEl}
              <tr className="m2th">
                <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
                <td>会议标题</td>
                <td>组织名称</td>
                <td>会议类型</td>
                <td>时间</td>
                <td>是否归档</td>
                <td width="12%">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
