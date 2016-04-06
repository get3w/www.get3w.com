import * as React from 'react'
import * as _ from 'lodash'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  flowUser: models.FlowUser
  onClose: Function
}

interface S {
  flowUser: models.FlowUser
  controls: { [index: string]: boolean }
}

export default class XINZENG extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      flowUser: this.props.flowUser || new models.FlowUser(),
      controls: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      flowUser: nextProps.flowUser || new models.FlowUser(),
      controls: {}
    })
  }

  onChange(name: string, e) {
    const flowUser = this.state.flowUser
    flowUser[name] = e.target.value
    this.state.flowUser = flowUser;
    this.setState(this.state);
  }

  onValueChange(name: string, value: string, e) {
    this.state.flowUser[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onCalendarSelect(name: string, date: Date, e) {
    const dateStr = utils.Translate.toShortDate(date)
    this.state.flowUser[name] = dateStr
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)

    const flowUser = this.state.flowUser
    if (this.props.flowUser) {
      client.flowUsers.edit(flowUser, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose()
          browserHistory.push(links.PARTY_MEMBERS_LD)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      flowUser.orgID = this.props.org.id
      flowUser.orgName = this.props.org.orgName
      client.flowUsers.create(flowUser, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose()
          browserHistory.push(links.PARTY_MEMBERS_LD)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  render() {
    const flowUser = this.state.flowUser
    const title = this.props.flowUser ? '编辑流动党员' : '新增流动党员'

    let birthDayEl = null
    if (this.state.controls['birthDay']) {
      birthDayEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'birthDay') } />
    }

    let flowDateEl = null
    if (this.state.controls['flowDate']) {
      flowDateEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'flowDate') } />
    }

    let partyDateEl = null
    if (this.state.controls['partyDate']) {
      partyDateEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'partyDate') } />
    }

    return (
      <div>
        <div className="layerBg"></div>

        <div className="layerCon1" style={{ width: 700, height: 600, marginLeft: '-350px', marginTop: '-300px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="layer_fm1">
            <ul>
              <li>
                <span className="layer_fm1snm">姓名</span>
                <input value={flowUser.name} onChange={this.onChange.bind(this, 'name') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
              <li>
                <span className="layer_fm1snm">性别</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "sex") } value={flowUser.sex} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
                  <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["sex"] ? "block" : "none " }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "sex", "男") }>男</dd>
                      <dd onClick={this.onValueChange.bind(this, "sex", "女") }>女</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="layer_fm1snm">身份证</span>
                <input value={flowUser.idCardNumber} onChange={this.onChange.bind(this, 'idCardNumber') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
              <li>
                <span className="layer_fm1snm">出生年月</span>
                <input value={utils.Translate.toShortDate(flowUser.birthDay) } onClick={this.onClick.bind(this, "birthDay") } type="text" className="m2fm_int m2fm_int2" style={{ width: 160 }} />
                {birthDayEl}
              </li>
              <li>
                <span className="layer_fm1snm">民族</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "nationality") } value={flowUser.nationality} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
                  <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["nationality"] ? "block" : "none " }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "汉族") }>汉族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "壮族") }>壮族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "满族") }>满族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "回族") }>回族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "苗族") }>苗族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "维吾尔族") }>维吾尔族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "土家族") }>土家族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "彝族") }>彝族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "蒙古族") }>蒙古族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "藏族") }>藏族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "布依族") }>布依族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "侗族") }>侗族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "瑶族") }>瑶族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "朝鲜族") }>朝鲜族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "白族") }>白族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "哈尼族") }>哈尼族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "哈萨克族") }>哈萨克族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "黎族") }>黎族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "傣族") }>傣族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "畲族") }>畲族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "傈僳族") }>傈僳族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "仡佬族") }>仡佬族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "东乡族") }>东乡族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "高山族") }>高山族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "拉祜族") }>拉祜族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "水族") }>水族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "佤族") }>佤族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "纳西族") }>纳西族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "羌族") }>羌族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "土族") }>土族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "仫佬族") }>仫佬族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "锡伯族") }>锡伯族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "柯尔克孜族") }>柯尔克孜族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "达斡尔族") }>达斡尔族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "景颇族") }>景颇族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "毛南族") }>毛南族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "撒拉族") }>撒拉族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "布朗族") }>布朗族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "塔吉克族") }>塔吉克族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "阿昌族") }>阿昌族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "普米族") }>普米族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "鄂温克族") }>鄂温克族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "怒族") }>怒族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "京族") }>京族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "基诺族") }>基诺族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "德昂族") }>德昂族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "保安族") }>保安族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "俄罗斯族") }>俄罗斯族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "裕固族") }>裕固族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "乌孜别克族") }>乌孜别克族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "门巴族") }>门巴族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "鄂伦春族") }>鄂伦春族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "独龙族") }>独龙族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "塔塔尔族") }>塔塔尔族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "赫哲族") }>赫哲族</dd>
                      <dd onClick={this.onValueChange.bind(this, "nationality", "珞巴族") }>珞巴族</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="layer_fm1snm">学位</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "degree") } value={flowUser.degree} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
                  <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["degree"] ? "block" : "none " }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "degree", "学士") }>学士</dd>
                      <dd onClick={this.onValueChange.bind(this, "degree", "硕士") }>硕士</dd>
                      <dd onClick={this.onValueChange.bind(this, "degree", "博士") }>博士</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="layer_fm1snm">学历</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "education") } value={flowUser.education} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
                  <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["education"] ? "block" : "none " }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "education", "研究生") }>研究生</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "本科") }>本科</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "大专") }>大专</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "中专") }>中专</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "高中") }>高中</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "初中") }>初中</dd>
                      <dd onClick={this.onValueChange.bind(this, "education", "小学") }>小学</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="layer_fm1snm">党支部联系人</span>
                <input value={flowUser.linkman} onChange={this.onChange.bind(this, 'linkman') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
              <li>
                <span className="layer_fm1snm">联系人联系方式</span>
                <input value={flowUser.contact} onChange={this.onChange.bind(this, 'contact') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
              <li>
                <span className="layer_fm1snm">党内职位</span>
                <input value={flowUser.positionName} onChange={this.onChange.bind(this, 'positionName') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
              <li>
                <span className="layer_fm1snm">流出地</span>
                <div className="m2fm_selContent">
                  <input onClick={this.onClick.bind(this, "comeFrom") } value={flowUser.comeFrom} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
                  <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["comeFrom"] ? "block" : "none " }}>
                    <dl>
                      <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨省") }>跨省</dd>
                      <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨市") }>跨市</dd>
                      <dd onClick={this.onValueChange.bind(this, "comeFrom", "跨地") }>跨地</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="layer_fm1snm">流入日期</span>
                <input value={utils.Translate.toShortDate(flowUser.flowDate) } onClick={this.onClick.bind(this, "flowDate") } type="text" className="m2fm_int m2fm_int2" style={{ width: 160 }} />
                {flowDateEl}
              </li>
              <li>
                <span className="layer_fm1snm">入党日期</span>
                <input value={utils.Translate.toShortDate(flowUser.partyDate) } onClick={this.onClick.bind(this, "partyDate") } type="text" className="m2fm_int m2fm_int2" style={{ width: 160 }} />
                {partyDateEl}
              </li>
              <li>
                <span className="layer_fm1snm">手机</span>
                <input value={flowUser.mobile} onChange={this.onChange.bind(this, 'mobile') } type="text" className="m2fm_int m2fm_int10" style={{ width: 160 }} />
              </li>
            </ul>
            <div className="clear" />
          </div>
          <div className="m2btnBox2">
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
//     <input onClick={this.onClick.bind(this, "flowType") } value={flowUser.flowType} type="text" className="m2fm_int m2fm_int3" placeholder="请选择" style={{ width: 160 }} />
//     <div className="m2fm_selBox" style={{ width: 180, display: this.state.controls["flowType"] ? "block" : "none" }}>
//       <dl>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨省") }>跨省</dd>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨市") }>跨市</dd>
//       <dd onClick={this.onValueChange.bind(this, "flowType", "跨地") }>跨地</dd>
//       </dl>
//     </div>
//   </div>
// </li>
