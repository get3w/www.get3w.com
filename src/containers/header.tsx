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
  isRight: boolean
}

class Header extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      isRight: false,
    }
  }

  onRightClick(e: React.MouseEvent) {
    this.setState({
      isRight: !this.state.isRight
    })
  }

  onOrgChange(org: models.Org, isAdmin: boolean, isLeader: boolean, title: string, e: React.MouseEvent) {

  }

  render() {

    return (
      <div className="header">
        <a className="logo" href="#"><img src="/assets/images/logo.jpg" width="351" height="49" /></a>
        <div className="headSel">
         <div className="headNm" onClick={this.onRightClick.bind(this)}>
         &nbsp;
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
)(Header);
