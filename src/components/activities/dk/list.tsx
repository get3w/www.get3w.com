import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as states from '../../../constants/states';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import * as constants from '../../../constants'
import GUIDANG from "../../../components/meetings/guidang/form"

interface P {
  meetingTypeID: number
  org: models.Org
  isOp: boolean
  onMainChange: (mainType: string, meeting: models.Meeting) => void
}

interface S {
  meetings: Array<models.Meeting>
  winType: string
  id: number
  searchKeyword: string
  isSearchFrom: boolean
  isSearchTo: boolean
  searchFrom: string
  searchTo: string
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meetings: null,
      winType: '',
      id: null,
      searchKeyword: '',
      isSearchFrom: false,
      isSearchTo: false,
      searchFrom: '',
      searchTo: ''
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.id)
  }

  load(orgID: number) {
    if (this.state.searchKeyword || this.state.searchFrom || this.state.searchTo) {
      client.meetings.searchByKeyword(orgID, this.props.meetingTypeID, this.state.searchKeyword, this.state.searchFrom, this.state.searchTo, (err: models.Error, res) => {
        this.state.meetings = res
        this.setState(this.state)
      })
    } else {
      client.meetings.list(orgID, this.props.meetingTypeID, (err: models.Error, res) => {
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
    this.state.isSearchFrom = this.state.isSearchTo = false
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
    this.load(this.props.org.id)
  }

  render() {
    if (!this.state.meetings) return <InnerLoading />
    const isOp = this.props.isOp

    const listEl = this.state.meetings.map((meeting: models.Meeting) => {
      let opEl = null
      if (!meeting.isArchive && isOp) {
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
          <td>{meeting.meetingTopics}</td>
          <td>{utils.Translate.toShortDate(meeting.meetingDate)}</td>
          <td>{meeting.orgName}</td>
          <td className="center">
            {opEl}
          </td>
        </tr>
      )
    })

    // const listEl = this.state.orgs.map((org: models.Org) => {
    //   return (
    //     <tr>
    //       <td><span className="cor_red">{org.orgName}</span></td>
    //       <td>{org.orgType}</td>
    //       <td>{org.isCancel ? "否" : "是"}</td>
    //       <td>
    //         <a className="m2fm_abtn" href="#">授权</a>
    //         <a className="m2fm_abtn" href="#">删除</a>
    //         <a className="m2fm_abtn" href="javascript:;" onClick={this.onWindow.bind(this, constants.WinTypes.ORGS_ADD, org.id)}>编辑</a>
    //       </td>
    //     </tr>
    //   )
    // })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="#" className="m2fmPage_a">＜</a>
    //     <a href="#" className="m2fmPage_a on">1</a>
    //     <a href="#" className="m2fmPage_a">2</a>
    //     <a href="#" className="m2fmPage_a">3</a>
    //     <a href="#" className="m2fmPage_a">4</a>
    //     <a href="#" className="m2fmPage_a">5</a>
    //     <a href="#" className="m2fmPage_a">6</a>
    //     <a href="#" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="#" className="m2fmPage_a">99</a>
    //     <a href="#" className="m2fmPage_a">100</a>
    //     <a href="#" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    let formEl = null
    if (this.state.winType) {
      let meeting = null
      this.state.meetings.forEach((m: models.Meeting) => {
        if (this.state.id === m.id) {
          meeting = m
        }
      })
      if (this.state.winType === constants.WinTypes.MEETING_GUIDANG) {
        formEl = <GUIDANG meeting={meeting} onClose={this.onClose.bind(this) } onSuccess={this.load.bind(this, this.props.org.id)} />
      }
    }

    let searchFromEl = null
    let searchToEl = null
    if (this.state.isSearchFrom) {
      searchFromEl = (
        <div style={{position: "absolute", left: "35%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchFrom")} />
        </div>
      )
    }
    if (this.state.isSearchTo) {
      searchToEl = (
        <div style={{position: "absolute", left: "45%", marginTop: "35px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "searchTo")} />
        </div>
      )
    }

    let listOpEl = null
    if (isOp) {
      listOpEl = (
        <tr>
          <td colSpan={4}>
          </td>
          <td colSpan={3}>
            <div>
              <a onClick={this.props.onMainChange.bind(this, "add", null) } href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
              <img src="/assets/images/m2btn2.jpg" width="76" height="32" style={{ marginLeft: "10px" }} />
            </div>
          </td>
        </tr>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">党课名称：</span>
          <input value={this.state.searchKeyword} onChange={this.onChange.bind(this, 'searchKeyword')} type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">授课题目：</span>
          <input type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">开课时间：</span>
          <input value={this.state.searchFrom} onClick={this.onClick.bind(this,"isSearchFrom")} onChange={this.onChange.bind(this, "isSearchFrom")} type="text" name="" className="m2fm_int m2fm_int6" />
          {searchFromEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.searchTo} onClick={this.onClick.bind(this,"isSearchTo")} onChange={this.onChange.bind(this, "isSearchTo")} type="text" name="" className="m2fm_int m2fm_int6" />
          {searchToEl}
          <input onClick={this.onSearch.bind(this)} type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2pdTab">
          <table width="100%">
            <tbody>
              {listOpEl}
              <tr className="m2th">
                <td width="5%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
                <td>党课名称</td>
                <td>授课题目 </td>
                <td>开课时间</td>
                <td>组织名称</td>
                <td width="13%">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
          {pager}
        </div>
      </div>
    )
  }
}

// <div className="m2fm_selContent" style={{float: "left"}}>
//   <input type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="选择机构" />
//   <div className="m2fm_selBox m2fm_selBox2">
//     <dl>
//       <dd>党员</dd>
//       <dd>非党员</dd>
//     </dl>
//   </div>
// </div>
