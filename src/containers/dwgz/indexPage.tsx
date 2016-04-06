import * as React from 'react'
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/dwgz/subNav"
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'
import LWJJFZ from "../../components/members/lwjjfz/form"
import ZHUANCHU from "../../components/members/zhuanchu/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
}

class IndexPage extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState)
  }

  componentDidMount() {
    this.load(this.props.orgState)
  }

  load(orgState: states.OrgState) {
    if (!orgState.isAdmin && !orgState.isLeader) {
      browserHistory.push(constants.Links.INDEX)
    }
  }

  render() {
    if (!this.props.children) {
      browserHistory.push(constants.Links.DWGZ_KH)
    }

    let currentTitle = ''
    const href = location.pathname.toLowerCase()
    if (href.endsWith(constants.Links.DWGZ_KH)) {
      currentTitle = '工作考核'
    }

    return (
      <div className="main2">
        <Location navTitle="党委工作" navUrl={constants.Links.DWGZ} currentTitle={currentTitle} />
        <SubNav />
        {this.props.children}
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
)(IndexPage);
