import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as states from '../../../constants/states';
import * as actions from '../../../constants/actions';
import {Loading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as types from '../../../constants/actionTypes';
import * as authActions from '../../../actions/authActions';
import * as orgActions from '../../../actions/orgActions';
import * as links from '../../constants/links';

interface P {
  authActions?: actions.AuthActions,
  authState?: states.AuthState
  orgActions?: actions.OrgActions,
  orgState?: states.OrgState
}

interface S {
  isDynamic: boolean
}

class LoginPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      isDynamic: false,
    }
  }

  onTypeChange(isDynamic: boolean) {
    this.setState({
      isDynamic: isDynamic,
    })
  }

  componentDidMount() {
    var userNameNode: any = ReactDOM.findDOMNode(this.refs["userName"])
    userNameNode.focus()
  }

  componentWillReceiveProps(props) {
    if (!props.authState.isAnonymous) {
      window.location.hash = links.INDEX
    }
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const userName = this.refs["userName"]["value"]
    const password = this.refs["password"]["value"]
    if (userName && password) {
      utils.DOM.loading(true)
      client.users.login(userName, password, (err, res) => {
        utils.DOM.loading(false)
        if (!err && res.user) {
          //const token = res.token
          const user = res.user
          //const orgLeaders = res.orgLeaders
          //const orgAdmins = res.orgAdmins
          //const isAnonymous = (token && user && user.id) ? false : true

          // const authState = {
          //   token, user, orgs, orgLeaders, orgAdmins, isAnonymous
          // }
          // this.props.authActions.login(authState)
          // const orgState = utils.Logic.getOrgState(user, orgs, orgLeaders, orgAdmins)
          // this.props.orgActions.orgChange(orgState)

          window.location.hash = links.INDEX

        } else {
          utils.Swal.error({
            status: 404,
            message: "登录失败，用户名或者密码不正确"
          })
        }
      })
    }
  }

  render() {
    if (this.state.isDynamic) {
      return (
        <div>
          <div className="lgLogo autoImg">
            <img src="/assets/mobile/images/lg_logo.png" />
          </div>
          <div className="lgChange">
            <a onClick={this.onTypeChange.bind(this, false)} className="lgChange_a" href="javascript:;">静态密码</a>
            <a onClick={this.onTypeChange.bind(this, true)} className="lgChange_a on" href="javascript:;">动态密码</a>
          </div>
          <ul className="lgFm">
            <li>
              <img src="/assets/mobile/images/lg_icon3.png" />
              <input placeholder="请输入手机号" className="lgFm_int" type="text" />
            </li>
            <li>
              <img src="/assets/mobile/images/lg_icon4.png" />
              <input placeholder="请输入验证码" className="lgFm_int" type="text" />
              <div className="lgFm_gt">
                <a href="#" className="lg_getCoder">获取验证码</a>
              </div>
            </li>
            <li className="lgSvPwd">
              <span className="fl">
                <input className="mchke" type="checkbox" />记住密码</span>
              <a href="#" className="fr">忘记密码？</a>
            </li>
            {/*<li class="lgBtn">
                    <a href="javascript:;" class="lgSubmit">登录</a>
                    </li>*/}
            <li className="lgBtn">
              <a href="index.html" className="lgSubmit">登录</a>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <div>
        <div className="lgLogo autoImg">
          <img src="/assets/mobile/images/lg_logo.png" />
        </div>
        <div className="lgChange">
          <a onClick={this.onTypeChange.bind(this, false)} className="lgChange_a on" href="javascript:;">静态密码</a>
          <a onClick={this.onTypeChange.bind(this, true)} className="lgChange_a" href="javascript:;">动态密码</a>
        </div>
        <ul className="lgFm">
          <form id="frm">
            <li>
              <img src="/assets/mobile/images/lg_icon1.png" />
              <input ref="userName" placeholder="请输入用户名" className="lgFm_int" type="text" />
            </li>
            <li>
              <img src="/assets/mobile/images/lg_icon2.png" />
              <input ref="password" placeholder="请输入密码" className="lgFm_int" type="password" />
            </li>
            <li className="lgSvPwd">
              <span className="fl">
                <input className="mchke" name="isChecked" type="checkbox" />记住密码</span>
              <a href="#" className="fr">忘记密码？</a>
            </li>
            {/*<li class="lgBtn">
            <a href="javascript:;index.html" class="lgSubmit">登录</a>
            </li>*/}
            <li className="lgBtn">
              <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="lgSubmit">登录</a>
            </li>
          </form>
        </ul>
        <Loading />
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
)(LoginPage);
