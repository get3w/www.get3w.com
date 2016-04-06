import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Upload from 'rc-upload'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as links from '../../constants/links';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as authActions from '../../actions/authActions';

interface P {
  authActions?: actions.AuthActions,
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isSelfOrOp: boolean
  user: models.User
}

class UserXGTXPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      user: null,
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.setState({
        isSelfOrOp: this.state.isSelfOrOp,
        user: this.props.authState.user
      })
    } else {

    }
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isSelfOrOp: this.state.isSelfOrOp,
      user: this.state.user
    })
  }

  render() {
    if (!this.state.user) return <InnerLoading />

    const props = null

    return (
      <div className="mper_fm">
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">修改头像</div>
        <div className="m2upLaod m2per_upload">
          <div className="m2pImg">
            <img width="120" height="120" />
          </div>
          <div className="m2pTxt">
            <Upload {...props}>
              <a href="javascript:;" className="m2Btn">
              </a>
            </Upload>
            支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
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

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserXGTXPage);
