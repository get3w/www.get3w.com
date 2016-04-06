import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states'
import Form from "../../components/members/add/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isError: boolean
  user: models.User
}

class MembersEditPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      user: null,
    }
  }

  componentDidMount() {
    
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isError: false,
      user: this.state.user
    })
  }

  render() {
    if (!this.state.user) return <InnerLoading />

    let errorEl = null
    if (this.state.isError) {
      errorEl = (
        <div>
          <div className="layerBg"></div>
          <div className="layerCon1 layerCon2">
          <i className="layerClose" onClick={this.onClose.bind(this)}></i>
          <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    const formEl = <Form user={this.state.user} org={this.props.orgState.org} />

    return (
      <div>
        {errorEl}
        {formEl}
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
)(MembersEditPage);
