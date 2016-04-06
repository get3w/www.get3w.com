import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links'
import VIEW from '../../components/users/basic/view'
import EDIT from '../../components/users/basic/edit'

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
}

class UserPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      isEdit: false,
      user: null,
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.setState({
        isSelfOrOp: this.state.isSelfOrOp,
        isEdit: false,
        user: this.props.authState.user
      })
    } else {
      
    }
  }

  onMain(isEdit: boolean) {
    this.state.isEdit = isEdit
    this.setState(this.state)
  }

  render() {
    if (!this.state.user) return <InnerLoading />

    let mainEl = null
    if (this.state.isEdit) {
      mainEl = <EDIT user={this.state.user} onMain={this.onMain.bind(this)} />
    } else {
      mainEl = <VIEW user={this.state.user} onMain={this.onMain.bind(this)} isSelfOrOp={this.state.isSelfOrOp} />
    }

    return (
      <div className="mper_fm">
        <div className="mper_stop">
          <span className="fl">基础资料表单</span>
          <span className="fr">当前组织机构 : {this.props.authState.user.orgName}</span>
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
)(UserPage);
