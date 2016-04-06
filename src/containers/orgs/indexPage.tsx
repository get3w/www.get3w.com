import * as React from 'react'
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as constants from '../../constants';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/orgs/subNav"
import * as actions from '../../actions/authActions';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any,
  params: {
    id: number
  }
}

class IndexPage extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps: P) {
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
      if (this.props.orgState.org.orgType === '党支部') {
        browserHistory.push(constants.Links.ORGS_DT)
      }
      else {
        browserHistory.push(constants.Links.ORGS_GL)
      }
    }

    let currentTitle = ''
    const href = location.pathname.toLowerCase()
    if (href.endsWith(constants.Links.ORGS_JG)) {
      currentTitle = '组织架构'
    } else if (href.endsWith(constants.Links.ORGS_GL)) {
      currentTitle = '组织管理'
    } else if (href.endsWith(constants.Links.ORGS_HJ)) {
      currentTitle = '换届'
    } else if (href.endsWith(constants.Links.ORGS_LD)) {
      currentTitle = '领导成员'
    } else if (href.endsWith(constants.Links.ORGS_DT)) {
      currentTitle = '组织动态管理'
    } else if (href.endsWith(constants.Links.ORGS_SZ)) {
      currentTitle = '机构设置'
    }

    let isManage = true
    if (this.props.orgState.org.orgType === '党支部') {
      isManage = false
    }

    return (
      <div className="main2">
        <Location navTitle="党组织" navUrl={constants.Links.ORGS} currentTitle={currentTitle} />
        <SubNav {...this.props} isManage={isManage} />
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
