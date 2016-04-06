import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import {Loading, Alert, Input} from '../../lib/components'
import * as lang from '../../lib/lang'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as types from '../../constants/actionTypes';
import * as authActions from '../../actions/authActions';
import * as links from '../../constants/links';

interface P {
  authActions?: actions.AuthActions
  authState?: states.AuthState
}

interface S {
  alert: models.Alert
}

class LoginPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      alert: null
    }
  }

  componentDidMount() {
    var accountNode: any = ReactDOM.findDOMNode(this.refs["account"])
    accountNode.focus()
  }

  componentWillReceiveProps(props) {
    if (!props.authState.isAnonymous) {
      browserHistory.push(links.INDEX)
    }
  }

  onForgetPassword(e: React.MouseEvent) {
    utils.DOM.stop(e)
    utils.Page.redirect(utils.Addr.getForgetPasswordUrl())
  }

  onSignup(e: React.MouseEvent) {
    utils.DOM.stop(e)
    utils.Page.redirect(utils.Addr.getSignupUrl())
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const account = utils.DOM.getValue(this.refs["account"])
    const password = utils.DOM.getValue(this.refs["password"])
    if (account && password) {
      utils.DOM.loading(true)
      client.users.login(account, password, (err, res) => {
        utils.DOM.loading(false)
        if (!err && res.user) {
          const token = res.accessToken
          const user = res.user
          const isAnonymous = (token && user && user.id) ? false : true

          const authState: states.AuthState = {
            token, user, isAnonymous
          }
          this.props.authActions.login(authState)
          browserHistory.push(links.INDEX)

        } else {
          this.setState({
            alert: new models.Alert(models.EAlertType.DANGER, lang.get('There was a problem with your login.'))
          })
        }
      })
    }
  }

  render() {
    var alertEl = null
    if (this.state.alert) {
      alertEl = <Alert alert={this.state.alert} />
    }
    var accountEl = <Input ref="account" placeholder={lang.get('Username or Email') } className='email' required={true} />
    var passwordEl = <Input ref='password' placeholder={lang.get('Password') } className='password' required={true} />

    return (
      <div className='console-auth'>
        <div className='input-box'>
          <form className='container' ref='form' onSubmit={this.onSubmit.bind(this) }>
            <a className='logo ct-center-block' href='/'>
              <img src={utils.Addr.getImgUrl('logo-grey.png') } />
            </a>
            {alertEl}
            <label className='login-input'>
              {accountEl}
              {passwordEl}
            </label>
            <button className='ct-btn --block ct-bg-blue' onClick={this.onSubmit.bind(this) }>{lang.get('Log In') }</button>
            <div className='login-back ct-mt-lg ct-mlr-sm'>
              <a className='ct-fl grey' href='javascript:;' onClick={this.onForgetPassword.bind(this) }>{lang.get('Forgot password?') }</a>
              <a className='ct-fr red' href='javascript:;' onClick={this.onSignup.bind(this) }>{lang.get('No account? Sign up') }</a>
            </div>
          </form>
        </div>
        <Loading />
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
)(LoginPage);
