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
          <a onClick={this.props.onMain.bind(this, true) } className="m2per_abtn" href="javascript:;">修 改</a>
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm m2per_u6">
          <ul>
            <li>
              <span className="m2fm_s1"> 登录名：</span>
              {user.userName}
            </li>
            <li>
              <span className="m2fm_s1"> 性  别：</span>
              {user.sex}
            </li>
            <li>
              <span className="m2fm_s1"> 姓  名：</span>
              {user.displayName}
            </li>
            <li>
              <span className="m2fm_s1"> 出生日期：</span>
              {utils.Translate.toShortDate(user.birthDay)}
            </li>
            <li>
              <span className="m2fm_s1"> 身份证号：</span>
              {user.idCardNumber}
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              {user.administrativeDuties}
            </li>
            <li>
              <span className="m2fm_s1"> 民  族：</span>
              {user.nationality}
            </li>
            <li>
              <span className="m2fm_s1"> 学  位：</span>
              {user.education}
            </li>
            <li>
              <span className="m2fm_s1"> 学  历：</span>
              {user.degree}
            </li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              {user.mobile}
            </li>
            <li>
              <span className="m2fm_s1"> 毕业院校：</span>
              {user.graduateSchool}
            </li>
            <li>
              <span className="m2fm_s1"> 入党时间：</span>
              {utils.Translate.toShortDate(user.partyDate)}
            </li>
            <li>
              <span className="m2fm_s1"> 联系电话：</span>
              {user.tel}
            </li>
            <li>
              <span className="m2fm_s1"> 党员状态：</span>
              {user.userType === '党员' ? (user.partyMemberState || '正常') : user.userType}
            </li>
            <li>
              <span className="m2fm_s1"> 电子邮箱：</span>
              {user.email}
            </li>
          </ul>
          <div className="clear"></div>
        </div>
        {editBtnEl}
      </div>
    )
  }
}
