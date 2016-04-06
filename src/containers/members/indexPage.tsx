import * as React from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/members/subNav"
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
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
      browserHistory.push(constants.Links.MEMBERS_SQ)
    }

    let currentTitle = ''
    const href = location.pathname.toLowerCase()
    if (href.endsWith(constants.Links.MEMBERS_SQ)) {
      currentTitle = '申请人管理'
    } else if (href.endsWith(constants.Links.MEMBERS_JJ)) {
      currentTitle = '积极分子管理'
    } else if (href.endsWith(constants.Links.MEMBERS_FZ)) {
      currentTitle = '发展对象管理'
    } else if (href.endsWith(constants.Links.MEMBERS_YB)) {
      currentTitle = '预备党员管理'
    } else if (href.endsWith(constants.Links.MEMBERS_ADD)) {
      currentTitle = '新增'
    }
    let subNavEl = null
    if (!href.endsWith(constants.Links.MEMBERS_ADD)) {
      subNavEl = <SubNav />
    }

    return (
      <div className="main2">
        <Location navTitle="党员发展" navUrl={constants.Links.MEMBERS} currentTitle={currentTitle} />
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
