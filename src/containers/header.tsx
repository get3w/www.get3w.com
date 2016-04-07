import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as states from '../constants/states';
import * as actions from '../constants/actions';
import * as models from "../api/models"
import * as utils from '../lib/utils'
import {Alert, Input} from '../lib/components'
import * as types from '../constants/actionTypes';
import * as authActions from '../actions/authActions';
import * as orgActions from '../actions/orgActions';

interface P {
  authActions?: actions.AuthActions,
  orgActions?: actions.OrgActions,
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  query: string
  isMenu: boolean
}

class Header extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      query: utils.Page.getUrlVar('q'),
      isMenu: false,
    }
  }

  onSearch(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    if (this.state.query) {
      utils.Page.redirect('')
    }
  }

  onSingoutClick(e: React.MouseEvent) {
    //utils.Auth.signout()
  }

  onMenu(e: React.MouseEvent) {
    this.setState({
      query: this.state.query,
      isMenu: !this.state.isMenu
    })
  }

  render() {
    var btnElement = null
    if (this.props.authState.isAnonymous) {
      btnElement = [
        <a key="signup" className="signup" href={utils.Addr.getSignupUrl() }>Sign up</a>,
        <a key="login" className="login" href={utils.Addr.getLoginUrl() }>Login</a>
      ]
    } else {
      var username = this.props.authState.user.username
      var userUrl = ''//webUtils.getUserUrl(username)
      var starsUrl = ''//webUtils.getStarsUrl(username)
      var menuEl = null
      if (this.state.isMenu) {
        menuEl = (
          <ul className="dropdown-menu">
            <li className="dropdown-header">Welcome</li>
            <li className="divider" />
            <li><a href={userUrl}>Your apps</a></li>
            <li><a href={starsUrl}>Your stars</a></li>
            <li className="divider" />
            <li><a href="">Create new...</a></li>
            <li className="divider" />
            <li><a href="">Settings</a></li>
            <li><a href="javascript:void(0)" onClick={this.onSingoutClick.bind(this) }>Sign out</a></li>
          </ul>
        )
      }
      btnElement = (
        <div className="user">
          <a className="username" href="javascript:void(0)" onClick={this.onMenu.bind(this) }>
            {username}
            <i className="fa fa-caret-down" />
          </a>
          {menuEl}
        </div>
      )
    }

    let sloganEl = null
    sloganEl = (
      <div className="ct-container carrousel">
        <div className="ico">
          <img src="/assets/img/features/logo-large.png" />
        </div>
        <p className="solgan">
          Edit the World Wide Web
        </p>
        <p className="sub-slogan">
          You can change any websites with Get3W Editor, Enter your website URL below and make changes.
        </p>
        <div className="start-button">
          <input type="text" placeholder="http://example.com" className="start-input" />
          <a href="/signup/index.html?returnUrl=%2F" className="g3-btn register-btn">
            <span>Start edit</span>
            <i className="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    )

    return (
      <header className="header liner-bg">
        <div className="ct-container">
          <div className="navigation">
            <div className="navbar-header">
              <a className="logo ct-fl" href="/"><img src="/assets/img/logo.png" alt="logo" /></a>
              <a className="navbar-toggle ct-fr" href="/"><i className="fa fa-reorder" /></a>
            </div>
            <div className="navbar-collapse collapse">
              <nav className="nav">
                <a href="" style={{ display: 'none' }}>Features</a>
                <a href="">Explore</a>
                <a href="">Pricing</a>
              </nav>
              <div className="navbar-right">
                <form className="input-form" onSubmit={this.onSearch.bind(this) }>
                  <input value={utils.Page.getUrlVar('q') } className="input-text" />
                  <a className="fa fa-search" href="javascript:void(0)" onClick={this.onSearch.bind(this) }></a>
                </form>
                {btnElement}
              </div>
            </div>
          </div>
        </div>
        {sloganEl}
      </header>
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
)(Header);
