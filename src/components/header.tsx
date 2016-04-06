import * as React from 'react'
import * as utils from '../lib/utils'
import * as jsxInput from '../lib/controls/jsxInput'

interface S {
  menu: boolean
}

export default class Header extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      menu: false
    }
  }

  onSearch(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    // var q: string = jsxInput.getValue(this.refs, "q")
    // if (q) {
    //   utils.Page.redirect(webUtils.getSearchUrl(q, '', '', ''))
    // }
  }

  onMenu(e: React.MouseEvent) {
    this.setState({
      menu: !this.state.menu
    })
  }

  onSingoutClick(e: React.MouseEvent) {
    //utils.Auth.signout()
  }

  render() {
    var btnElement = null
    // if (this.props.stateInfo.isAnonymous) {
    //   btnElement = [
    //     <a key="signup" className="signup" href={utils.Addr.getSignupUrl() }>Sign up</a>,
    //     <a key="login" className="login" href={utils.Addr.getLoginUrl() }>Login</a>
    //   ]
    // } else {
    //   var username = this.props.stateInfo.user.username
    //   var userUrl = webUtils.getUserUrl(username)
    //   var starsUrl = webUtils.getStarsUrl(username)
    //   var menuEl = null
    //   if (this.state.menu) {
    //     menuEl = (
    //       <ul className="dropdown-menu">
    //         <li className="dropdown-header">Welcome</li>
    //         <li className="divider" />
    //         <li><a href={userUrl}>Your apps</a></li>
    //         <li><a href={starsUrl}>Your stars</a></li>
    //         <li className="divider" />
    //         <li><a href={webUtils.getUrl(data.Const.PAGE_NEW) }>Create new...</a></li>
    //         <li className="divider" />
    //         <li><a href={webUtils.getUrl(data.Const.PAGE_SETTINGS_ACCOUNT) }>Settings</a></li>
    //         <li><a href="javascript:void(0)" onClick={this.onSingoutClick.bind(this) }>Sign out</a></li>
    //       </ul>
    //     )
    //   }
    //   btnElement = (
    //     <div className="user">
    //       <a className="username" href="javascript:void(0)" onClick={this.onMenu.bind(this) }>
    //         {username}
    //         <i className="fa fa-caret-down" />
    //       </a>
    //       {menuEl}
    //     </div>
    //   )
    // }

    var query = utils.Page.getUrlVar('q')
    var qEl = React.createElement(jsxInput.Component, jsxInput.getProps('q', query, '', 'input-text', false, false, null))

    // var indexUrl = webUtils.getIndexUrl()
    // var featuresUrl = webUtils.getUrl(data.Const.PAGE_FEATURES)
    // var exploreUrl = webUtils.getUrl(data.Const.PAGE_EXPLORE)
    // var pricingUrl = webUtils.getUrl(data.Const.PAGE_PRICING)

    return (
      <div className="ct-container">
        <div className="navigation">
          <div className="navbar-header">
            <a className="logo ct-fl" href="/"><img src="/assets/img/logo.png" alt="logo" /></a>
            <a className="navbar-toggle ct-fr" href="/"><i className="fa fa-reorder" /></a>
          </div>
          <div className="navbar-collapse collapse">
            <nav className="nav">
              <a href="/" style={{display: 'none'}}>Features</a>
              <a href="/">Explore</a>
              <a href="/">Pricing</a>
            </nav>
            <div className="navbar-right">
              <form className="input-form" onSubmit={this.onSearch.bind(this) }>
                {qEl}
                <a className="fa fa-search" href="javascript:void(0)" onClick={this.onSearch.bind(this) }></a>
              </form>
              {btnElement}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
