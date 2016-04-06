import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as links from '../../constants/links'

import * as states from '../../../constants/states';
import * as actions from '../../../constants/actions';
import * as models from "../../../api/models"
import * as utils from '../../../lib/utils'
import {Alert, Input} from '../../../lib/components'
import * as types from '../../../constants/actionTypes';
import * as authActions from '../../../actions/authActions';
import * as orgActions from '../../../actions/orgActions';

interface P {
  onUserChange: (isUser: boolean) => void
  authActions?: actions.AuthActions,
  orgActions?: actions.OrgActions,
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

class User extends React.Component<P, {}> {
  onLogout(e: React.MouseEvent) {
    utils.DOM.stop(e)
    this.props.authActions.logout()
    window.location.hash = links.LOGIN
  }

  render() {
    const org = this.props.orgState.org || new models.Org()
    const user = this.props.authState.user

    return (
      <div>
        <div onClick={this.props.onUserChange.bind(this, false) } className="mLayerBg"></div>
        <div className="perLayer perLayerIn">
          <div className="per_head clearfix">
            <div className="perHdImg autoImg">
              <img className="userAvatar" />
            </div>
            <div className="perInfo2">
              <strong className="displayName">{user.displayName}</strong>
              <p>
                {org.orgName}
                <br />
                {this.props.orgState.title}
              </p>
            </div>
          </div>
          <ul className="perMenu">
            <li>
              <Link to={links.USER_BASIC} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon1.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon1a.png" />
                基本资料
              </Link>
            </li>
            <li>
              <Link to={links.USER_MESSAGE} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon2.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon2a.png" />
                消息通知
              </Link>
            </li>
            <li>
              <Link to={links.USER_DANGFEI} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon3.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon3a.png" />
                党费缴纳
              </Link>
            </li>
            <li>
              <Link to={links.USER_ROLE} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon4.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon4a.png" />
                切换角色
              </Link>
            </li>
            <li>
              <Link to={links.USER_CHANGEPASSWORD} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon5.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon5a.png" />
                账号安全
              </Link>
            </li>
            <li>
              <Link to={links.SETTINGS} className="perMenu_a">
                <img src="/assets/mobile/images/per_icon6.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon6a.png" />
                设置
              </Link>
            </li>
            <li>
              <a onClick={this.onLogout.bind(this)} href="javascript:;" className="perMenu_a perMenu_Cuta">
                <img src="/assets/mobile/images/per_icon7.png" />
                <img className="per_cutImg" src="/assets/mobile/images/per_icon7a.png" />
                退出登录
              </a>
            </li>
          </ul>
          <div className="perBomLg">
            <img src="/assets/mobile/images/lg_yd.jpg" />
          </div>
        </div>
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

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    orgActions: bindActionCreators(orgActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
