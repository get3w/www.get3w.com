import * as React from 'react'
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as actions from '../../actions/authActions';
import * as constants from '../../constants';
import Location from "../../components/location"
import LeftNav from './leftNav'
import RightNav from './rightNav'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any,
  params: {
    userName: string
  }
}

interface S {
  isError: boolean
  isSelf: boolean
  user: models.User
}

class IndexPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      isSelf: props.authState.user.userName === props.params.userName,
      user: null,
    }
  }

  componentDidMount() {
    if (this.state.isSelf) {
      this.setState({
        isError: false,
        isSelf: true,
        user: this.props.authState.user
      })
    } else {
      
    }
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isError: false,
      isSelf: this.state.isSelf,
      user: this.state.user
    })
  }

  render() {
    if (!this.props.children) {
      browserHistory.push(constants.Links.USERS + this.props.authState.user.userName)
    }

    if (!this.state.user) return <InnerLoading />
    const isOp = this.props.orgState.isOp

    let errorEl = null
    if (this.state.isError) {
      errorEl = (
        <div>
          <div className="layerBg">
          </div>
          <div className="layerCon1 layerCon2">
            <i className="layerClose" onClick={this.onClose.bind(this) }></i>
            <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    return (
      <div className="main2_per">
        {errorEl}
        <Location navTitle="用户中心" navUrl={constants.Links.USERS + '/' + this.props.params.userName} />
        <div className="mperCon">
          <div className="mperL">
            <Link to="/" className="mper_back"></Link>
            <LeftNav isSelf={this.state.isSelf} isOp={isOp} userName={this.props.params.userName} user={this.state.user} />
            {this.props.children}
            <div className="clear">
            </div>
          </div>
          <RightNav isSelf={this.state.isSelf} isOp={isOp} userName={this.props.params.userName} user={this.state.user} />
          <div className="clear">
          </div>
        </div>
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
