import * as React from 'react'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import {Loading} from '../../lib/components'
import * as utils from '../../lib/utils'
import * as models from '../../api/models'
import * as links from '../constants/links';
import * as states from '../../constants/states';
import Footer from './footer';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
}

class App extends React.Component<P, {}> {
  

  render() {
    let isDWGZ = true
    if (this.props.orgState.org) {
      if (this.props.orgState.org.orgType === '党支部' || this.props.orgState.org.orgType === '党总支') {
        isDWGZ = false
      }
    }

    return (
      <div>
        {this.props.children}
        <Footer />
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

export default connect(
  mapStateToProps
)(App);
