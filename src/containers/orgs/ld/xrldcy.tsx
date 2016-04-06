import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import Location from "../../../components/location"
import SubNav from "../../../components/partymembers/subNav"
import * as actions from '../../../actions/authActions';
import * as states from '../../../constants/states'
import * as constants from '../../../constants'
import XRLDCYXZ from "../../../components/orgs/xrldcyxz/form"
import Confirm from "../../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  orgLeaders: Array<models.OrgLeader>
  winType: string
  id: number
  orgLeaderUserNames: Array<string>
}

class XRLDCY extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgLeaders: null,
      winType: '',
      id: null,
      orgLeaderUserNames: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.orgLeaders.list(orgID, true, '', 0, (err: models.Error, res: Array<models.OrgLeader>) => {
      const orgLeaderUserNames = res.map((orgLeader: models.OrgLeader) => {
        return orgLeader.userName
      })
      this.setState({
        orgLeaders: res,
        winType: '',
        id: null,
        orgLeaderUserNames: orgLeaderUserNames
      })
    })
  }

  onEdit(winType, id, e) {
    this.setState({
      orgLeaders: this.state.orgLeaders,
      winType: winType,
      id: id,
      orgLeaderUserNames: this.state.orgLeaderUserNames
    })
  }

  onClose(isReload: boolean, e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
    if (isReload) {
      this.load(this.props.orgState.org.id)
    }
  }

  onZhuanClick(orgLeader: models.OrgLeader, e) {
    orgLeader.isCurrent = false
    utils.DOM.loading(true)
    client.orgLeaders.edit(orgLeader, () => {
      utils.DOM.loading(false)
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.orgLeaders) return <InnerLoading />

    const listEl = this.state.orgLeaders.map((orgLeader: models.OrgLeader) => {
      return (
        <tr key={orgLeader.id}>
          <td className="center">{orgLeader.taxis}</td>
          <td className="center"><a href={"/users/" + orgLeader.userName} target="_blank" className="cor_red">{orgLeader.displayName}</a></td>
          <td className="center">{orgLeader.positionTitle}</td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_ZWLJ, orgLeader.id) } className="m2fm_abtn" href="javascript:;">转为历届</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_XRLDCYXZ, orgLeader.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
            <a onClick={() => {
              utils.Swal.confirm('此操作将删除所选项，确认吗', '', (isConfirm: boolean) => {
                if (isConfirm) {
                  client.orgLeaders.delete(orgLeader.id, () => {
                    this.load(this.props.orgState.org.id)
                  })
                }
              })
            }} className="m2fm_abtn" href="javascript:;">删除</a>
          </td>
        </tr>
      )
    })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="javascript:;" className="m2fmPage_a">＜</a>
    //     <a href="javascript:;" className="m2fmPage_a on">1</a>
    //     <a href="javascript:;" className="m2fmPage_a">2</a>
    //     <a href="javascript:;" className="m2fmPage_a">3</a>
    //     <a href="javascript:;" className="m2fmPage_a">4</a>
    //     <a href="javascript:;" className="m2fmPage_a">5</a>
    //     <a href="javascript:;" className="m2fmPage_a">6</a>
    //     <a href="javascript:;" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="javascript:;" className="m2fmPage_a">99</a>
    //     <a href="javascript:;" className="m2fmPage_a">100</a>
    //     <a href="javascript:;" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    let formEl = null
    if (this.state.winType) {
      let orgLeader = null
      this.state.orgLeaders.forEach((m: models.OrgLeader) => {
        if (this.state.id === m.id) {
          orgLeader = m
        }
      })
      if (this.state.winType === constants.WinTypes.ORGS_XRLDCYXZ) {
        formEl = <XRLDCYXZ orgLeader={orgLeader} orgLeaderUserNames={this.state.orgLeaderUserNames} org={this.props.orgState.org} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.ORGS_ZWLJ) {
        formEl = <Confirm title={"将 " + orgLeader.displayName + " 转为历届"} onSubmit={this.onZhuanClick.bind(this, orgLeader)} onClose={this.onClose.bind(this)} />
      }
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_dx">
          <strong>{this.props.orgState.org.orgName}领导成员</strong>
          <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_XRLDCYXZ, 0) } className="m2fm_pubBtn2" href="javascript:;">新 增 </a>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="11%" className="center">排序</td>
                <td className="center">姓名</td>
                <td className="center">职务</td>
                <td width="18%" className="center">操作</td>
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
)(XRLDCY);
