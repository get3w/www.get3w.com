import * as React from 'react'
import * as _ from 'lodash'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import { browserHistory } from 'react-router'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  isZhuanChu: boolean
  user: models.User
  org: models.Org
  ot: models.OrgTransfer
  onClose: (isReload: boolean) => void
  isOp: boolean
}

interface S {
  ot: models.OrgTransfer
  isAgree: boolean
  targetOrgs: Array<models.Org>
  controls: { [index: string]: boolean }
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ot: null,
      isAgree: true,
      targetOrgs: null,
      controls: {}
    }
  }

  componentDidMount() {
    this.load(this.props.ot || new models.OrgTransfer())
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.ot || new models.OrgTransfer())
  }

  load(ot: models.OrgTransfer) {
    if (!this.props.isZhuanChu) { // 转入
      if (ot.transferType === '移动集团内部转接') {
        client.orgs.search(ot.targetOrgID, '', 'false', '党支部', 'true',(err: models.Error, res: Array<models.Org>) => {
          this.setState({
            ot: ot,
            isAgree: true,
            targetOrgs: res,
            controls: {}
          })
        })
      } else {
        this.setState({
          ot: ot,
          isAgree: true,
          targetOrgs: null,
          controls: {}
        })
      }
    } else { // 转出
      let isTargetList = false
      if (this.props.org.orgType === '直属党委' || this.props.org.orgType === '地方党委'){
        if (ot.transferType === '内部调动') {
          isTargetList = true
          client.orgs.search(this.props.org.id, '', 'false', '党支部','true', (err: models.Error, res: Array<models.Org>) => {
            this.setState({
              ot: ot,
              isAgree: true,
              targetOrgs: res,
              controls: {}
            })
          })
        } else if (ot.transferType === '移动集团内部转接') {
          isTargetList = true
          client.orgs.searchDW(this.props.org.id, (err: models.Error, res: Array<models.Org>) => {
            this.setState({
              ot: ot,
              isAgree: true,
              targetOrgs: res,
              controls: {}
            })
          })
        }
      }
      if (!isTargetList){
        this.setState({
          ot: ot,
          isAgree: true,
          targetOrgs: null,
          controls: {}
        })
      }
    }
  }

  onChange(name: string, e) {
    const ot = this.state.ot
    ot[name] = e.target.value
    this.state.ot = ot;
    this.setState(this.state);
  }

  onValueChange(name: string, value: string, e) {
    const ot = this.state.ot
    ot[name] = value
    this.state.controls[name] = false
    if (name === 'transferType') {
      this.load(ot)
    } else {
      this.setState(this.state);
    }
  }

  onCalendarSelect(name: string, date: Date, e) {

    const dateStr = utils.Translate.toShortDate(date)
    this.state.ot[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onAgreeClick(value: boolean, e) {
    this.state.isAgree = value
    this.setState(this.state)
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    if (this.state.targetOrgs && !this.state.ot.targetOrgID) {
      utils.Swal.warning('提交失败，必须选择目标组织')
      return
    }

    utils.DOM.loading(true)

    const ot = this.state.ot
    if (this.props.ot) {
      if (this.props.isOp) {
        if (this.state.isAgree) {
          if (!this.props.isZhuanChu) { // 转入

          } else { // 转出
            let orgType = this.props.org.orgType
            if (orgType === '地方党委' || orgType === '直属党委') {
              orgType = '党委'
            }
            ot.applyState = orgType + "审核通过"
            if (ot.transferType === '内部调动') {
              if (orgType === '党委') {
                ot.applyState = "转接完成"
              }
            } else if (ot.transferType === '离职转出') {
              if (orgType === '党委') {
                ot.applyState = "转接完成"
              }
            } else { //移动集团内部转接
              if (this.props.org.id === ot.targetOrgID) {
                ot.applyState = "转接完成"
              }
            }
            client.orgTransfers.edit(ot, (err, res) => {
              utils.DOM.loading(false)
              if (!err) {
                this.props.onClose(true)
              } else {
                utils.Swal.error(err)
              }
            })
          }
        } else {
          client.orgTransfers.delete(this.props.ot.id, (err, res) => {
            utils.DOM.loading(false)
            if (!err) {
              this.props.onClose(true)
            } else {
              utils.Swal.error(err)
            }
          })
        }
      } else {
        client.orgTransfers.edit(ot, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            this.props.onClose(true)
          } else {
            utils.Swal.error(err)
          }
        })
      }
    } else {
      ot.userName = this.props.user.userName
      ot.displayName = this.props.user.displayName
      ot.sourceOrgID = this.props.user.orgID
      ot.sourceOrgName = this.props.user.orgName
      ot.applyState = '提出申请'
      ot.applyDate = new Date()
      client.orgTransfers.create(ot, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          const summary = this.props.user.orgName + ' 申请转出'
          
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onClick(name: string, e) {
    this.state.controls[name] = !!!this.state.controls[name]
    this.setState(this.state)
  }

  render() {
    const ot = this.state.ot
    if (!ot) return <InnerLoading />

    const title = this.props.ot ? (this.props.user ? '编辑组织关系转接': '同意组织关系转接') : '新增组织关系转接'

    let partyDuesDateEl = null
    if (this.state.controls['partyDuesDate']) {
      partyDuesDateEl = (
        <div style={{position: "absolute", left: "160px"}}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'partyDuesDate') } />
        </div>
      )
    }

    let agreeEl = null
    if (this.props.isOp) {
      agreeEl = (
        <li>
          <span className="lay_s1" style={{ width: 92 }}>是否同意</span>
          <div className="m2c1_cer" style={{textAlign: "left"}}>
            <input onClick={this.onAgreeClick.bind(this, true)} checked={this.state.isAgree} name="isAgree" type="radio" value="1" /> 同意
            &nbsp;&nbsp;
            <input onClick={this.onAgreeClick.bind(this, false)} checked={!this.state.isAgree} name="isAgree" type="radio" value="2" /> 不同意
          </div>
        </li>
      )
    }

    let targetOrgNameEl: any = null
    if (this.state.targetOrgs) {
      const targetOrgListEl = this.state.targetOrgs.map((org: models.Org) => {
        return <dd key={org.id} onClick={ (e) => {
          this.state.ot.targetOrgID = org.id
          this.state.ot.targetOrgName = org.orgName
          this.state.controls['targetOrgName'] = false
          this.setState(this.state)
        } }>{org.orgName}</dd>
      })
      targetOrgNameEl = (
        <li>
          <span className="lay_s1" style={{ width: 92 }}>目标组织</span>
          <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
            <input onClick={this.onClick.bind(this, "targetOrgName") } value={ot.targetOrgName} type="text" className="m2fm_int m2fm_int3" style={{ width: "270px" }} />
            <div className="m2fm_selBox" style={{ display: this.state.controls["targetOrgName"] ? "block" : "none ", width: "270px" }}>
              <dl>
                {targetOrgListEl}
              </dl>
            </div>
          </div>
        </li>
      )
    } else {
      targetOrgNameEl = (
        <li>
          <span className="lay_s1" style={{ width: 92 }}>目标组织</span>
          <input value={ot.targetOrgName} onChange={this.onChange.bind(this, 'targetOrgName') } type="text" className="m2fm_int m2fm_int10" style={{ width: "270px" }} />
        </li>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ height: 555, width: 518, marginLeft: '-259px', marginTop: '-292px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this, false) } />
          <div className="layer_t">{title}</div>
          <div className="m2nadBox m2per_boxUl">
            <ul>
              <li>
                <span className="lay_s1" style={{ width: 92 }}>转接类型</span>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                  <input onClick={this.onClick.bind(this, "transferType") } value={ot.transferType} type="text" className="m2fm_int m2fm_int3" style={{ width: "270px" }} />
                  <div className="m2fm_selBox" style={{ display: this.state.controls["transferType"] ? "block" : "none ", width: "270px" }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "transferType", "内部调动") }>内部调动</dd>
                      <dd onClick={this.onValueChange.bind(this, "transferType", "移动集团内部转接") }>移动集团内部转接</dd>
                      <dd onClick={this.onValueChange.bind(this, "transferType", "离职转出") }>离职转出</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="lay_s1" style={{ width: 92 }}>党费缴至时间</span>
                <input value={utils.Translate.toShortDate(ot.partyDuesDate)} onClick={this.onClick.bind(this, 'partyDuesDate') } type="text" className="m2fm_int m2fm_int2 m2fm_int10" style={{ width: "270px" }} />
                {partyDuesDateEl}
              </li>
              <li>
                <span className="lay_s1" style={{ width: 92 }}>原党支部</span>
                { this.props.user ? this.props.user.orgName : this.props.ot.sourceOrgName }
              </li>
              {targetOrgNameEl}
              <li style={{ height: 80 }}>
                <span className="lay_s1" style={{ width: 92 }}>备注</span>
                <textarea value={ot.summary} onChange={this.onChange.bind(this, 'summary') } className="m2fm_int m2fm_int10" style={{ padding: '5px 10px', lineHeight: "20px", height: "80px", width: "270px" }} />
              </li>
              {agreeEl}
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingLeft: 151 }}>
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}

// <li>
//   <span className="layer_fm1snm">流动类型</span>
//   <div className="m2fm_selContent">
//     <input onClick={this.onClick.bind(this, "flowType") } value={ot.flowType} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
//     <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["flowType"] ? "block" : "none" }}>
//       <dl>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨省") }>跨省</dd>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨市") }>跨市</dd>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨地") }>跨地</dd>
//       </dl>
//     </div>
//   </div>
// </li>
