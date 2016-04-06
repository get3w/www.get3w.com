import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as utils from '../../../lib/utils';
import * as links from '../../constants/links';
import * as states from '../../../constants/states';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState
}

class BasicPage extends React.Component<P, {}> {
  render() {
    const user = this.props.authState.user

    return (
      <div>
        <div className="mTop">
          <Link to={links.INDEX} className="mTop_back">
          </Link>
          基本资料
        </div>
        <ul className="mPerInfo">
          <li>
            <span className="mPer_inm">姓名</span>
            <span className="mper_val displayName">{user.displayName}</span>
          </li>
          <li>
            <span className="mPer_inm">身份证号</span>
            <span className="mper_val idCardNumber">{user.idCardNumber}</span>
          </li>
          <li>
            <span className="mPer_inm">手机号</span>
            <span className="mper_val mobile">{user.mobile}</span>
          </li>
          <li>
            <span className="mPer_inm">邮箱</span>
            <span className="mper_val email">{user.email}</span>
          </li>
          <li>
            <span className="mPer_inm">学历</span>
            <span className="mper_val education">{user.education}</span>
          </li>
          <li>
            <span className="mPer_inm">民族</span>
            <span className="mper_val nationality">{user.nationality}</span>
          </li>
          <li>
            <span className="mPer_inm">籍贯</span>
            <span className="mper_val nativePlace">{user.nativePlace}</span>
          </li>
          <li>
            <span className="mPer_inm">工作单位</span>
            <span className="mper_val workOrganization">{user.workOrganization}</span>
          </li>
        </ul>
        <div className="mLine" />
        <ul className="mPerInfo">
          <li>
            <span className="mPer_inm">申请入党日期</span>
            <span className="mper_val applyPartyDate">{utils.Translate.toShortDate(user.applyPartyDate)}</span>
          </li>
          <li>
            <span className="mPer_inm">转为积极分子日期</span>
            <span className="mper_val toActivistDate">{utils.Translate.toShortDate(user.toActivistDate)}</span>
          </li>
          <li>
            <span className="mPer_inm">正式党员日期</span>
            <span className="mper_val toFullmembersDate">{utils.Translate.toShortDate(user.partyDate)}</span>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

export default connect(
  mapStateToProps
)(BasicPage);
