import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isSelfOrOp: boolean
  user: models.User
  histories: Array<models.History>
}

class UserFZLLPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      user: null,
      histories: null
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.load(this.props.authState.user)
    } else {
      
    }
  }

  load(user: models.User) {
    client.histories.list(user.userName, (err: models.Error, res: Array<models.History>) => {
      this.setState({
        isSelfOrOp: this.state.isSelfOrOp,
        user: user,
        histories: res
      })
    })
  }

  render() {
    if (!this.state.histories) return <InnerLoading />

    let i = 0
    const historiesEl = this.state.histories.map((history: models.History) => {
      if (i % 2 === 0) {
        return (
          <dd key={i++}>
            <div className="m2hisBox">
              {utils.Translate.toShortDate(history.happenDate) } {history.summary}
              <i></i></div>
            <div className="clear"></div>
          </dd>
        )
      } else {
        return (
          <dd className="m2hisEven" key={i++}>
            <div className="m2hisBox">
              {utils.Translate.toShortDate(history.happenDate) } {history.summary}
              <i></i></div>
            <div className="clear"></div>
          </dd>
        )
      }
    })

    return (
      <div className="mper_fm">
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">发展履历</div>
        <div className="m2per_u3">
          <div className="m2per_u3nm">党员<br />历程</div>
          <div className="m2per_bmBg"></div>
          <dl>
            {historiesEl}
          </dl>
          <div className="clear"></div>
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
)(UserFZLLPage);
