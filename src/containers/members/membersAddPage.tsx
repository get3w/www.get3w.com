import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states'
import Form from "../../components/members/add/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState
}

interface S {
  isNotFound: boolean
  users: Array<models.User>
  userName: string
}

class MembersAddPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isNotFound: false,
      users: [],
      userName: null,
    }
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const idCardNumber = this.refs["idCardNumber"]["value"]
    if (idCardNumber) {
      utils.DOM.loading(true)
      
    }
  }

  onSelect(userName: string, e: React.MouseEvent) {
    this.setState({
      isNotFound: false,
      users: this.state.users,
      userName: userName
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isNotFound: false,
      users: this.state.users,
      userName: this.state.userName
    })
  }

  render() {
    let notFoundEl = null
    if (this.state.isNotFound) {
      notFoundEl = (
        <div>
          <div className="layerBg"></div>
          <div className="layerCon1 layerCon2">
          <i className="layerClose" onClick={this.onClose.bind(this)}></i>
          <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    let resultsEl = null
    let formEl = null

    if (this.state.users && this.state.users.length > 0) {
      const users = this.state.users || []
      const usersEl = this.state.users.map((user: models.User) => {
        let title = user.userType || "（群众）"
        return <span key={user.id}><input name="userName" type="radio" onClick={this.onSelect.bind(this, user.userName)} />{user.userName}{title}</span>
      })
      resultsEl = <div className="m2c1_cer">{usersEl}</div>

      if (this.state.userName) {
        this.state.users.forEach((user: models.User) => {
          if (user.userName === this.state.userName) {
            let user = null
            if (this.state.users && this.state.users.length > 0) {
              this.state.users.forEach((m: models.User) => {
                if (m.userName === this.state.userName) {
                  user = m
                }
              })
            }
            formEl = <Form user={user} org={this.props.orgState.org} />
          }
        })
      }
    }

    return (
      <div>
        {notFoundEl}
        <div className="m2con1">
          <div className="m2c1_top">
            <strong>身份证：</strong>
            <input ref="idCardNumber" className="m2c1_int" placeholder="请输入身份证号码" name="" type="text" />
            <input value="" className="m2submit" name="" type="submit" onClick={this.onSubmit.bind(this)} />
          </div>
          {resultsEl}
        </div>
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
)(MembersAddPage);
