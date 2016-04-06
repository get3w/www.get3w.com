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
  records: Array<models.Record>
}

class UserZBDHJYPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      user: null,
      records: null
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.load(this.props.authState.user)
    } else {
      
    }
  }

  load(user: models.User) {
    client.records.searchByMeeting(user.userName, (err: models.Error, res: Array<models.Record>) => {
      if (!err && res) {
        this.setState({
          isSelfOrOp: this.state.isSelfOrOp,
          user: user,
          records: res
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  getListEl() {
    let i = 1
    return this.state.records.map((record: models.Record) => {
      return (
        <tr key={record.id}>
          <td className="center">{i++}</td>
          <td className="center">{utils.Translate.toShortDate(record.happenDate)}</td>
          <td className="left">{record.meetingName}</td>
        </tr>
      )
    })
  }

  render() {
    if (!this.state.user || !this.state.records) return <InnerLoading />

    const listEl = this.getListEl()

    return (
      <div className="mper_fm">
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">支部大会决议</div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2per_table">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td className="center">序 号</td>
                <td className="center">时 间</td>
                <td className="center">会议名称</td>
              </tr>
              {listEl}
            </tbody>
          </table>
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
)(UserZBDHJYPage);
