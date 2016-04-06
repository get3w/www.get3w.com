import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as constants from '../../constants'
import ZHUANCHU_ADD from '../../components/users/zhuanchu_add/form'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isSelf: boolean
  user: models.User
  ots: Array<models.OrgTransfer>
  winType: string
  id: number
}

class UserZHUANCHUPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ots: null,
      winType: '',
      id: null,
      isSelf: props.authState.user.userName === props.params.userName,
      user: null,
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.authState.user.userName)
  }

  componentDidMount() {
    this.load(this.props.authState.user.userName)
  }

  load(userName: string) {
    if (this.state.isSelf) {
      this.list(true, this.props.authState.user)
    } else {
      
    }
  }

  list(isSelf: boolean, user: models.User) {
    client.orgTransfers.list(0, 0, user.userName, (err: models.Error, res: Array<models.OrgTransfer>) => {
      this.setState({
        ots: res || [],
        isSelf: isSelf,
        winType: '',
        id: null,
        user: user
        })
    })
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  onClose(isReload: boolean, e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
    if (isReload) {
      this.load(this.props.authState.user.userName)
    }
  }

  onCancelClick(id: number, e) {
    utils.Swal.confirm('取消转出', '此操作将取消转出，确认吗？', (isConfirm: boolean) => {
      if (isConfirm) {
        client.orgTransfers.delete(id, (err: models.Error, res: {}) => {
          this.load(this.props.authState.user.userName)
        })
      }
    })
  }

  render() {
    if (!this.state.ots) return <InnerLoading />
    const isOp = this.props.orgState.isOp

    let isAddable = true
    const listEl = this.state.ots.map((ot: models.OrgTransfer) => {
      if (ot.applyState !== '转接完成') isAddable = false
      let cancelEl = null
      if (this.state.isSelf && ot.applyState === '提出申请') {
        cancelEl = <a onClick={this.onCancelClick.bind(this, ot.id)} href="javascript:;" className="m2fm_abtn">取消</a>
      }
      let editEl = null
      if ((this.state.isSelf && ot.applyState === '提出申请') || isOp) {
        editEl = <a onClick={this.onEdit.bind(this, constants.WinTypes.USERS_ZHUANCHU_ADD, ot.id)} href="javascript:;" className="m2fm_abtn">编辑</a>
      }
      return (
        <tr key={ot.id}>
          <td className="center">{utils.Translate.toShortDate(ot.addDate)}</td>
          <td className="center">{ot.transferType}</td>
          <td className="center">{ot.sourceOrgName}</td>
          <td className="center">{ot.targetOrgName}</td>
          <td className="center">{ot.applyState}</td>
          <td className="center">
            {cancelEl}
            {editEl}
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let orgTransfer = null
      this.state.ots.forEach((ot: models.OrgTransfer) => {
        if (this.state.id === ot.id) {
          orgTransfer = ot
        }
      })
      if (this.state.winType === constants.WinTypes.USERS_ZHUANCHU_ADD) {
        formEl = <ZHUANCHU_ADD isZhuanChu={true} isOp={isOp && !this.state.isSelf} user={this.props.authState.user} org={this.props.orgState.org} ot={orgTransfer} onClose={this.onClose.bind(this)} />
      }
    }

    let addBtnEl = null
    if (isAddable) {
      addBtnEl = (
        <div className="m2fm_btn2">
          <a onClick={this.onEdit.bind(this, constants.WinTypes.USERS_ZHUANCHU_ADD, 0)} href="javascript:;" className="m2fm_pubBtn2">添 加</a>
        </div>
      )
    }

    return (
      <div className="mper_fm">
        {formEl}
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">组织关系转接</div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2per_table">
          {addBtnEl}
          <table width="100%">
            <tbody><tr className="m2th">
              <td width="16%" className="center">申请日期</td>
              <td width="20%" className="center">转接类型</td>
              <td width="16%" className="center">原党支部</td>
              <td width="16%" className="center">目标组织</td>
              <td width="13%" className="center">状态</td>
              <td width="19%" className="center">操作</td>
            </tr>
            {listEl}
            </tbody></table>
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
)(UserZHUANCHUPage);
