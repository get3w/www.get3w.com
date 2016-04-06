import * as React from 'react'
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/analysis/subNav"
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
      browserHistory.push(constants.Links.ANALYSIS_DY)
    }

    let currentTitle = ''
    const href = location.pathname.toLowerCase()
    if (href.endsWith(constants.Links.ANALYSIS_GZ)) {
      currentTitle = '工作办理情况统计'
    } else if (href.endsWith(constants.Links.ANALYSIS_DY)) {
      currentTitle = '党员信息统计'
    } else if (href.endsWith(constants.Links.ANALYSIS_ZZ)) {
      currentTitle = '党组织信息统计'
    } else if (href.endsWith(constants.Links.ANALYSIS_SQ)) {
      currentTitle = '申请人统计'
    }

    return (
      <div className="main2">
        <Location navTitle="统计查询" navUrl={constants.Links.ANALYSIS} currentTitle={currentTitle} />
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
