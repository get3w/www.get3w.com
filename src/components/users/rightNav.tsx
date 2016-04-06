import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as constants from '../../constants'
import * as models from '../../api/models'
import * as states from '../../constants/states'
import LWJJFZ from "../../components/members/lwjjfz/form"
import LWFZDX from "../../components/members/lwfzdx/form"
import LWYBDY from "../../components/members/lwybdy/form"
import LWDY from "../../components/members/lwdy/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  userName: string
  user: models.User
  isSelf: boolean
  isOp: boolean
}

interface S {
  winType: string
}

class RightNav extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: '',
    }
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.setState(this.state)
  }

  onClose(e: React.MouseEvent) {
    this.state.winType = ''
    this.setState(this.state)
  }

  render() {
    const user = this.props.user

    let listEl = []
    let i = 0
    if (this.props.isSelf || this.props.isOp) {
      if (!this.props.isSelf && this.props.isOp) {
        listEl.push(<dd key={i++}>
          <Link to={constants.Links.USERS_SXHB_.replace(':userName', this.props.userName)} className="mper_a1" activeClassName="mper_a1 m2pos_cut">提交思想汇报</Link>
        </dd>)
      }

      if (this.props.isOp) {
        //申请人、积极分子、发展对象、预备党员、党员、历史党员
        if (user.userType === '申请人') {
          listEl.push(
            <a key={i++} onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWJJFZ)} className="mper_a1" href="javascript:;">列为积极分子</a>
          )
        } else if (user.userType === '积极分子') {
          listEl.push(
            <a key={i++} onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWFZDX)} className="mper_a1" href="javascript:;">列为发展对象</a>
          )
        } else if (user.userType === '发展对象') {
          listEl.push(
            <a key={i++} onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWYBDY)} className="mper_a1" href="javascript:;">列为预备党员</a>
          )
        } else if (user.userType === '预备党员') {
          listEl.push(
            <a key={i++} onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWDY)} className="mper_a1" href="javascript:;">列为党员</a>
          )
        }
      }

      if ((user.userType === '党员' || user.userType === '预备党员') && this.props.isSelf) {
        listEl.push(
          <dd key={i++}>
            <Link to={constants.Links.USERS_ZHUANCHU_.replace(':userName', this.props.userName)} className="mper_a1" activeClassName="mper_a1 m2pos_cut">转出</Link>
          </dd>
        )
      }
    }

    let formEl = null
    if (this.state.winType) {
      if (this.state.winType === constants.WinTypes.MEMBERS_LWJJFZ) {
        formEl = <LWJJFZ user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_LWFZDX) {
        formEl = <LWFZDX user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_LWYBDY) {
        formEl = <LWYBDY user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_LWDY) {
        formEl = <LWDY user={user} org={this.props.orgState.org} onClose={this.onClose.bind(this)} />
      }
    }

    return (
      <div className="mperMenu">
        {formEl}
        <dl>
          <dt>{this.props.user.userType}</dt>
          {listEl}
        </dl>
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
)(RightNav);
