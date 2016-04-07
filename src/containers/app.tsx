import * as React from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Loading} from '../lib/components'
import * as utils from '../lib/utils'
import * as models from '../api/models'
import * as states from '../constants/states';
import Top from "../containers/top"
import Header from "../containers/header"
import Footer from "../components/footer"
import * as links from '../constants/links';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
}

class App extends React.Component<P, {}> {
  render() {
    return (
      <div>
        <Header />
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
