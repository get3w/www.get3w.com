import * as React from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as constants from '../../constants';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import * as actions from '../../actions/authActions';
import List from "../../components/meetings/list"
import View from "../../components/meetings/view"
import Add from "../../components/meetings/add"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any,
}

interface S {
  meetingTypes: Array<models.MeetingType>
  meetingTypeID: number
  title: string
  mainType: string
  meeting: models.Meeting
}

class IndexPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meetingTypes: [],
      meetingTypeID: 0,
      title: '',
      mainType: '',
      meeting: null,
    }
  }

  componentDidMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps)
  }

  load(p: P) {
    client.meetingTypes.searchNav(true, p.orgState.org.orgType, (err: models.Error, res: Array<models.MeetingType>) => {
      if (!err && res) {
        this.setState({
          meetingTypes: res,
          meetingTypeID: res ? res[0].id : 0,
          title: '',
          mainType: '',
          meeting: null,
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  onNavClick(meetingTypeID: number, title: string) {
    this.setState({
      meetingTypes: this.state.meetingTypes,
      meetingTypeID: meetingTypeID,
      title: title,
      mainType: '',
      meeting: null,
    })
  }

  onMainChange(mainType, meeting: models.Meeting) {
    this.setState({
      meetingTypes: this.state.meetingTypes,
      meetingTypeID: meeting ? meeting.meetingTypeID : this.state.meetingTypeID,
      title: this.state.title,
      mainType: mainType,
      meeting: meeting,
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      meetingTypes: this.state.meetingTypes,
      meetingTypeID: this.state.meetingTypeID,
      title: this.state.title,
      mainType: '',
      meeting: null,
    })
  }

  render() {
    let navsEl = []
    if (this.state.meetingTypes && this.state.meetingTypes.length > 0) {
      navsEl = this.state.meetingTypes.map((m: models.MeetingType) => {
        return (
          <li key={m.id}>
            <a onClick={this.onNavClick.bind(this, m.id, m.typeName)} href="javascript:;" className={this.state.meetingTypeID === m.id ? "m2fm_a1 m2fm_a2" : "m2fm_a1" }>{m.typeName}</a>
          </li>
        )
      })
    }

    const isOp = this.props.orgState.isOp

    let mainEl = null
    if (this.state.meetingTypeID) {
      if (!this.state.mainType) {
        mainEl = <List isOp={isOp} isAdmin={this.props.orgState.isAdmin} org={this.props.orgState.org} meetingTypeID={this.state.meetingTypeID} onMainChange={this.onMainChange.bind(this)} />
      } else if (this.state.mainType === "view") {
        mainEl = <View meeting={this.state.meeting} onMainChange={this.onMainChange.bind(this)} />
      } else if (this.state.mainType === "add") {
        mainEl = <Add isOrgLife={true} meetingTypeID={this.state.meetingTypeID} org={this.props.orgState.org} meeting={this.state.meeting} userName={this.props.authState.user.userName} onMainChange={this.onMainChange.bind(this)} />
      }
    }

    return (
      <div className="main2">
        <Location navTitle="组织生活" navUrl={constants.Links.ACTIVITIES} currentTitle={this.state.title} />
        <div className="m2fmNav">
          <ul>
            {navsEl}
          </ul>
        </div>
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
)(IndexPage);
