import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import Location from "../../../components/location"
import SubNav from "../../../components/partymembers/subNav"
import * as actions from '../../../actions/authActions';
import * as states from '../../../constants/states'
import * as constants from '../../../constants'
import DWZPF from "../../../components/dwgz/dwzpf/form"
import CKDWDFXJ from "../../../components/dwgz/ckdwdfxj/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  records: Array<models.Record>
  winType: string
  id: number
  exam: models.TestExam
  isLoad: boolean
}

class DYBDQK extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      records: null,
      winType: '',
      id: null,
      exam: null,
      isLoad: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.testExams.getLast(this.props.orgState.org.id, (err: models.Error, res: models.TestExam) => {
      this.state.isLoad = true
      this.state.exam = res
      this.setState(this.state)
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

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  render(): any {
    if (!this.state.isLoad) return <InnerLoading />
    if (!this.state.exam) return <div style={{margin: "70px", textAlign: "center", fontSize: "16px"}}>暂无考核</div>

    let formEl = null
    if (this.state.winType) {
      if (this.state.winType === constants.WinTypes.DWGZ_DWZPF) {
        formEl = <DWZPF user={this.props.authState.user} org={this.props.orgState.org} exam={this.state.exam} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.DWGZ_CKDWDFXJ) {
        formEl = <CKDWDFXJ exam={this.state.exam} onClose={this.onClose.bind(this) } />
      }
    }

    return (
      <div className="m2fm_sbox1">
        {formEl}
        <table className="m2fm_stb1" width="100%">
          <tbody>
            <tr>
              <td>组织名称：{this.props.orgState.org.orgName}</td>
            </tr>
            <tr>
              <td>考核时间：{utils.Translate.toShortDate(this.state.exam.startTime) + ' 至 ' + utils.Translate.toShortDate(this.state.exam.endTime)}</td>
            </tr>
            <tr>
              <td>考核方案：{this.state.exam.solutionName}</td>
            </tr>
            <tr>
              <td>自评状态：{this.state.exam.isSelfDone ? '已评分' : '未评分'}</td>
            </tr>
          </tbody>
        </table>
        <div className="m2fm_sbxBtn" style={{ textAlign: 'left', paddingTop: 20, marginLeft: '-5px' }}>
          <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_DWZPF) } href="javascript:;" className="m2btn_a1">自评打分</a>
          <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_CKDWDFXJ) } href="javascript:;" className="m2btn_a2">查 看</a>
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
)(DYBDQK);
