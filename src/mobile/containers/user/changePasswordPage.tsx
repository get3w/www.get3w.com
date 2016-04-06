import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
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
  currentPassword: string
  password: string
  confirmPassword: string
  errors: { [index: string]: boolean }
}

class ChangePasswordPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      currentPassword: '',
      password: '',
      confirmPassword: '',
      errors: {}
    })
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state)
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    let errors = {}
    if (!this.state.password) {
      errors['password'] = true
    }
    if (!this.state.confirmPassword || this.state.confirmPassword != this.state.password) {
      errors['confirmPassword'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

    utils.DOM.loading(true)
    
  }

  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.INDEX} className="mTop_back"></Link>
          密码修改
        </div>
        <ul className="lgFm m2jf_u3">
          <li>
            <img src="/assets/mobile/images/lg_icon2.png" />
            <input type="password" value={this.state.currentPassword} onChange={this.onChange.bind(this, 'currentPassword') } className="lgFm_int" placeholder="请输入原密码" />
          </li>
          <li>
            <img src="/assets/mobile/images/lg_icon2.png" />
            <input type="password" value={this.state.password} onChange={this.onChange.bind(this, 'password') } className={this.state.errors['password'] ? 'lgFm_int error' : 'lgFm_int'} placeholder="请输入新密码"  />
          </li>
          <li>
            <img src="/assets/mobile/images/lg_icon2.png" />
            <input type="password" value={this.state.confirmPassword} onChange={this.onChange.bind(this, 'confirmPassword') } className={this.state.errors['confirmPassword'] ? 'lgFm_int error' : 'lgFm_int'} placeholder="确认新密码" />
          </li>
        </ul>
        <a onClick={this.onSubmit.bind(this)} className="mBm_btn1 changPassword" href="javascript:;">确定</a>
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
)(ChangePasswordPage);
