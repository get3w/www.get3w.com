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
      <div className="m2per_u2">
        <ul>
          <li>
            <strong className="m2per_sbnm">籍贯：</strong>
            <div className="m2per_txtInfo">{user.nativePlace}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">出生地：</strong>
            <div className="m2per_txtInfo">{user.placeBirth}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">户口所在地：</strong>
            <div className="m2per_txtInfo">{user.registeredResidence}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">家庭住址：</strong>
            <div className="m2per_txtInfo">{user.homeAddress}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">婚姻状况：</strong>
            <div className="m2per_txtInfo">{user.maritalStatus}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">工作时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.workingHours)}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">工作单位：</strong>
            <div className="m2per_txtInfo">{user.workOrganization}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">邮政编码：</strong>
            <div className="m2per_txtInfo">{user.postcode}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">技术职务：</strong>
            <div className="m2per_txtInfo">{user.technicalPositions}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">行政职务：</strong>
            <div className="m2per_txtInfo">{user.administrativeDuties}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">备注：</strong>
            <div className="m2per_txtInfo">{user.remarks}</div>
          </li>
        </ul>
      </div>
      {editBtnEl}
      </div>
    )
  }
}
