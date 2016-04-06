import * as React from 'react'
import * as _ from 'lodash'
import * as is from 'is_js'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Upload from 'rc-upload'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as authActions from '../../../actions/authActions';

interface P {
  authActions?: actions.AuthActions,
  authState?: states.AuthState,
  user: models.User
  onMain: (isEdit: boolean) => void
}

interface S {
  user: models.User
  controls: { [index: string]: boolean }
  errors: { [index: string]: boolean }
}

class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      controls: {},
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      user: nextProps.user,
      controls: {},
      errors: {}
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

    let errors = {}
    if (!this.state.user.displayName) {
      errors['displayName'] = true
    }
    if (!this.state.user.email || !is.email(this.state.user.email)) {
      errors['email'] = true
    }

    if(!this.state.user.nationality){
      errors['nationality'] = true
    }
    if(!this.state.user.education){
      errors['education'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

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
      applyCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'applyPartyDate') } />
    }
    let workingHoursCalendarEl = null
    if (this.state.controls['workingHours']) {
      workingHoursCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'workingHours') } />
    }
    let birthDayCalendarEl = null
    if (this.state.controls['birthDay']) {
      birthDayCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'birthDay') } />
    }

    const props = null;

    return (
      <div>
        <div className="m2upLaod">
          <div className="m2pImg">
            <img width="120" height="120" />
          </div>
          <div className="m2pTxt">
            <Upload {...props}>
              <a href="javascript:;" className="m2Btn">
              </a>
            </Upload>
            支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
          </div>
        </div>
        <div className="m2fm">
          <ul>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 登录名：</span>
              <input defaultValue={user.userName} disabled className="m2fm_int" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 姓  名：</span>
              <input value={user.displayName} onChange={this.onChange.bind(this, 'displayName') }  disabled className={this.state.errors['displayName'] ? 'm2fm_int error' : 'm2fm_int'} type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 性  别：</span>
              <input   value={user.sex} disabled className="m2fm_int " type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 身份证号：</span>
              <input value={user.idCardNumber} onChange={this.onChange.bind(this, 'idCardNumber') } disabled className="m2fm_int" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 出生日期：</span>
              <input value={utils.Translate.toShortDate(user.birthDay) } onClick={this.onClick.bind(this, "birthDay") }  onChange={this.onChange.bind(this, "birthDate") }  className={this.state.errors['birthDate'] ? 'm2fm_int error m2fm_int2' : 'm2fm_int m2fm_int2'} name="" type="text" />
              {birthDayCalendarEl}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 民  族：</span>
              <input onClick={this.onClick.bind(this, "nationality") } value={user.nationality}  placeholder="请选择"   className={this.state.errors['nationality'] ? 'error m2fm_int m2fm_int3' : 'm2fm_int m2fm_int3' }type="text" />
              <div className="m2fm_selBox" style={{ display: this.state.controls['nationality'] ? "block" : "none" }}>
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
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              <input value={user.administrativeDuties} onChange={this.onChange.bind(this, 'administrativeDuties') } className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 学  历：</span>
              <input onClick={this.onClick.bind(this, "education") } value={user.education}   placeholder="本科" className={this.state.errors['education'] ? 'error m2fm_int m2fm_int3' : 'm2fm_int m2fm_int3' }  type="text" />
              <div className="m2fm_selBox" style={{ display: this.state.controls['education'] ? "block" : "none" }}>
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
            </li>
            <li>
              <span className="m2fm_s1"> 学  位：</span>
              <input onClick={this.onClick.bind(this, "degree") } value={user.degree}  placeholder="博士" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{ display: this.state.controls['degree'] ? "block" : "none" }}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "degree", "学士") }>学士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "硕士") }>硕士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "博士") }>博士</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"> 联系电话：</span>
              <input value={user.tel} onChange={this.onChange.bind(this, 'tel') } className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              <input value={user.mobile} onChange={this.onChange.bind(this, 'mobile') } className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 邮  箱：</span>
              <input value={user.email} onChange={this.onChange.bind(this, 'email') } className={this.state.errors['email'] ? 'm2fm_int error' : 'm2fm_int'} name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 申请入党日期：</span>
              <input value={utils.Translate.toShortDate(user.applyPartyDate) } onClick={this.onClick.bind(this, "applyCalendar") } onChange={this.onChange.bind(this, "applyPartyDate") } className="m2fm_int m2fm_int2" name="" type="text" />
              {applyCalendarEl}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm m2fm2">
          <ul>
            <li>
              <span className="m2fm_s1"> 籍  贯：</span>
              <input onClick={this.onClick.bind(this, "nativePlace") } value={user.nativePlace}   placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
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
            </li>
            <li>
              <span className="m2fm_s1">工作单位：</span>
              <input value={user.workOrganization} onChange={this.onChange.bind(this, 'workOrganization') } className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">参加工作日期：</span>
              <input value={utils.Translate.toShortDate(user.workingHours) } onClick={this.onClick.bind(this, "workingHours") } onChange={this.onChange.bind(this, "workingHours") } className="m2fm_int m2fm_int2" name="" type="text" />
              {workingHoursCalendarEl}
            </li>
            <li>
              <span className="m2fm_s1">专业技术职务：</span>
              <input value={user.technicalPositions} onChange={this.onChange.bind(this, 'technicalPositions') } className="m2fm_int" name="" type="text" />
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

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
