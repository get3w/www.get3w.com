import * as React from 'react'
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/partymembers/subNav"
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
      browserHistory.push(constants.Links.PARTY_MEMBERS_DY)
    }

    let currentTitle = ''
    const href = location.pathname.toLowerCase()
    if (href.endsWith(constants.Links.PARTY_MEMBERS_DY)) {
      currentTitle = '党员管理'
    } else if (href.endsWith(constants.Links.PARTY_MEMBERS_YB)) {
      currentTitle = '预备党员管理'
    } else if (href.endsWith(constants.Links.PARTY_MEMBERS_LD)) {
      currentTitle = '流动党员管理'
    } else if (href.endsWith(constants.Links.PARTY_MEMBERS_ZZ)) {
      currentTitle = '组织关系转接'
    } else if (href.endsWith(constants.Links.PARTY_MEMBERS_LS)) {
      currentTitle = '历史党员管理'
    }

    let subNavEl = null
    if (!href.endsWith(constants.Links.PARTY_MEMBERS_ADD)) {
      subNavEl = <SubNav />
    }

    return (
      <div className="main2">
        <Location navTitle="党员管理" navUrl={constants.Links.PARTY_MEMBERS} currentTitle={currentTitle} />
        {subNavEl}
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
