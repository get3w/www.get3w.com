import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import * as states from '../../constants/states'
import * as constants from '../../constants'
import List from "../../components/meetings/list"
import View from "../../components/meetings/view"
import Add from "../../components/meetings/add"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  mainType: string
  meeting: models.Meeting
}

class MeetingsPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: '',
      meeting: null
    }
  }

  onMainChange(mainType, meeting: models.Meeting) {
    this.setState({
      mainType: mainType,
      meeting: meeting
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      mainType: '',
      meeting: null
    })
  }

  render() {
    const isOp = this.props.orgState.isOp

    let mainEl = null
    if (!this.state.mainType) {
      mainEl = <List isOp={isOp} isAdmin={this.props.orgState.isAdmin} org={this.props.orgState.org} meetingTypeID={0} onMainChange={this.onMainChange.bind(this)} />
    } else if (this.state.mainType === "view") {
      mainEl = <View meeting={this.state.meeting} onMainChange={this.onMainChange.bind(this)} />
    } else if (this.state.mainType === "add") {
      mainEl = <Add isOrgLife={false} org={this.props.orgState.org} meeting={this.state.meeting} userName={this.props.authState.user.userName} onMainChange={this.onMainChange.bind(this)} />
    }

    return (
      <div className="main2">
        <Location navTitle="会议管理" navUrl={constants.Links.MEETINGS} />
        {mainEl}
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
)(MeetingsPage);
