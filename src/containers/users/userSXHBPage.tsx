import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links'
import VIEW from '../../components/users/sxhb/view'
import EDIT from '../../components/users/sxhb/edit'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isSelfOrOp: boolean
  isEdit: boolean
  user: models.User
  record: models.Record
}

class UserSXHBPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      isEdit: false,
      user: null,
      record: null
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.setState({
        isSelfOrOp: this.state.isSelfOrOp,
        isEdit: false,
        user: this.props.authState.user,
        record: null
      })
    } else {
      
    }
  }

  onMain(isEdit: boolean, record: models.Record) {
    this.setState({
      user: this.state.user,
      isSelfOrOp: this.state.isSelfOrOp,
      isEdit: isEdit,
      record: record
    })
  }

  render() {
    if (!this.state.user) return <InnerLoading />

    let mainEl = null
    if (this.state.isEdit) {
      mainEl = <EDIT user={this.state.user} record={this.state.record} onMain={this.onMain.bind(this)} />
    } else {
      mainEl = <VIEW user={this.state.user} onMain={this.onMain.bind(this)} isSelf={this.props.authState.user.userName === this.props.params.userName} isOp={this.props.orgState.isOp} />
    }

    return (
      <div className="mper_fm">
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">思想汇报</div>
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
)(UserSXHBPage);
