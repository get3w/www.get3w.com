import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  isSelfOrOp: boolean
  onMain: (isEdit: boolean) => void
}

export default class View extends React.Component<P, {}> {
  render() {
    const user = this.props.user

    let editBtnEl = null
    if (this.props.isSelfOrOp) {
      editBtnEl = (
        <div className="m2per_btnBox">
          <a onClick={this.props.onMain.bind(this, true)} className="m2per_abtn" href="javascript:;">修 改</a>
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm">
          <ul>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 登录名：</span>
                {user.userName}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 姓  名：</span>
                {user.displayName}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 性  别：</span>
                {user.sex}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 身份证号：</span>
                {user.idCardNumber}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 出生日期：</span>
                {utils.Translate.toShortDate(user.birthDay)}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 民  族：</span>
                {user.nationality}
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              {user.administrativeDuties}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 学  历：</span>
                {user.education}
            </li>
            <li>
              <span className="m2fm_s1"> 学  位：</span>
              {user.degree}
            </li>
            <li>
              <span className="m2fm_s1"> 联系电话：</span>
              {user.tel}
            </li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              {user.mobile}
            </li>
            <li>
              <span className="m2fm_s1"> 邮  箱：</span>
              {user.email}
            </li>
            <li>
              <span className="m2fm_s1"> 申请入党日期：</span>
              {utils.Translate.toShortDate(user.applyPartyDate)}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm m2fm2">
          <ul>
            <li>
              <span className="m2fm_s1"> 籍  贯：</span>
              {user.nativePlace}
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 工作单位：</span>
                {user.workOrganization}
            </li>
            <li>
              <span className="m2fm_s1">参加工作日期：</span>
              {utils.Translate.toShortDate(user.workingHours)}
            </li>
            <li>
              <span className="m2fm_s1">专业技术职务：</span>
              {user.technicalPositions}
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        {editBtnEl}
      </div>
    )
  }
}
