import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as actions from '../../actions/authActions';
import * as states from '../../constants/states'
import * as constants from '../../constants'
import KHCJ_JITUAN from "./kh/khcj_jituan"
import KHCJ_JITUAN_LAST from "./kh/khcj_jituan_last"
import KHCJ_JITUAN_DWXQ from "./kh/khcj_jituan_dwxq"
import KHCJ_DIFANG from "./kh/khcj_difang"
import KHCJ_DIFANG_LAST from "./kh/khcj_difang_last"
import KHCJ_DW from "./kh/khcj_dw"
import FBKHRW_JITUAN from "./kh/fbkhrw_jituan"
import FBKHRW_DIFANG from "./kh/fbkhrw_difang";
import KHFASZ from "./kh/khfasz"
import KHZBSZ from "./kh/khzbsz"
import KHPF_DIFANG from "./kh/khpf_difang"
import KHPF_DW from "./kh/khpf_dw"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  tableType: string
  taskID: number
}

class Navs {
  static KHCJ_JITUAN = "khcj_jituan"
  static KHCJ_JITUAN_DWXQ = "khcj_jituan_dwxq"
  static KHCJ_JITUAN_LAST = "khcj_jituan_last"
  static KHCJ_JITUAN_LAST_DWXQ = "khcj_jituan_last_dwxq"
  static KHCJ_DIFANG = "khcj_difang"
  static KHCJ_DIFANG_LAST = "khcj_difang_last"
  static KHCJ_DW = "khcj_dw"
  static FBKHRW_JITUAN = "fbkhrw_jituan"
  static FBKHRW_DIFANG = "fbkhrw_difang"
  static KHZBSZ = "khzbsz"
  static KHFASZ = "khfasz"
  static KHPF_DIFANG = "khpf_difang"
  static KHPF_DW = "khpf_dw"
}

class DwgzKHPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    const orgType = props.orgState.org.orgType
    let tableType = ''
    if (orgType === '集团党组') {
      tableType = Navs.KHCJ_JITUAN_LAST
    } else if (orgType === '地方党组') {
      tableType = Navs.KHCJ_DIFANG_LAST
    } else if (orgType === '地方党委' || orgType === '直属党委') {
      tableType = Navs.KHCJ_DW
    }
    this.state = {
      tableType: tableType,
      taskID: 0
    }
  }

  onTableChange(tableType, taskID?: number) {
    this.setState({
      tableType: tableType,
      taskID: taskID || 0
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === Navs.KHCJ_JITUAN) {
      tableEl = <KHCJ_JITUAN onTableChange={this.onTableChange.bind(this)} />
    } else if (this.state.tableType === Navs.KHCJ_JITUAN_LAST) {
      tableEl = <KHCJ_JITUAN_LAST onTableChange={this.onTableChange.bind(this)} />
    } else if (this.state.tableType === Navs.KHCJ_JITUAN_DWXQ || this.state.tableType === Navs.KHCJ_JITUAN_LAST_DWXQ) {
      tableEl = <KHCJ_JITUAN_DWXQ taskID={this.state.taskID} />
    } if (this.state.tableType === Navs.KHCJ_DIFANG) {
      tableEl = <KHCJ_DIFANG />
    } else if (this.state.tableType === Navs.KHCJ_DIFANG_LAST) {
      tableEl = <KHCJ_DIFANG_LAST />
    } else if (this.state.tableType === Navs.KHCJ_DW) {
      tableEl = <KHCJ_DW />
    } else if (this.state.tableType === Navs.FBKHRW_JITUAN) {
      tableEl = <FBKHRW_JITUAN />
    } else if (this.state.tableType === Navs.FBKHRW_DIFANG) {
      tableEl = <FBKHRW_DIFANG />
    } else if (this.state.tableType === Navs.KHZBSZ) {
      tableEl = <KHZBSZ />
    } else if (this.state.tableType === Navs.KHFASZ) {
      tableEl = <KHFASZ />
    } else if (this.state.tableType === Navs.KHPF_DIFANG) {
      tableEl = <KHPF_DIFANG />
    } else if (this.state.tableType === Navs.KHPF_DW) {
      tableEl = <KHPF_DW />
    }

    const orgType = this.props.orgState.org.orgType
    let navEl = null
    if (orgType === '集团党组') {
      navEl = (
        <div className="m2fm_sub" style={{width: "709px"}}>
          <a onClick={this.onTableChange.bind(this, Navs.KHCJ_JITUAN_LAST)} href="javascript:;" className={this.state.tableType === Navs.KHCJ_JITUAN_LAST || this.state.tableType === Navs.KHCJ_JITUAN_LAST_DWXQ ? "m2fmSub_a on" : "m2fmSub_a"}>进行中考核成绩</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHCJ_JITUAN)} href="javascript:;" className={this.state.tableType === Navs.KHCJ_JITUAN || this.state.tableType === Navs.KHCJ_JITUAN_DWXQ ? "m2fmSub_a on" : "m2fmSub_a"}>历届考核成绩</a>
          <a onClick={this.onTableChange.bind(this, Navs.FBKHRW_JITUAN)} href="javascript:;" className={this.state.tableType === Navs.FBKHRW_JITUAN ? "m2fmSub_a on" : "m2fmSub_a"}>发布考核任务</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHFASZ)} href="javascript:;" className={this.state.tableType === Navs.KHFASZ ? "m2fmSub_a on" : "m2fmSub_a"}>考核方案设置</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHZBSZ)} href="javascript:;" className={this.state.tableType === Navs.KHZBSZ ? "m2fmSub_a on" : "m2fmSub_a"}>考核指标设置</a>
        </div>
      )
    } else if (orgType === '地方党组') {
      navEl = (
        <div className="m2fm_sub" style={{width: "540px"}}>
          <a onClick={this.onTableChange.bind(this, Navs.KHCJ_DIFANG_LAST)} href="javascript:;" className={this.state.tableType === Navs.KHCJ_DIFANG_LAST ? "m2fmSub_a on" : "m2fmSub_a"}>进行中考核成绩</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHCJ_DIFANG)} href="javascript:;" className={this.state.tableType === Navs.KHCJ_DIFANG ? "m2fmSub_a on" : "m2fmSub_a"}>历届考核成绩</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHPF_DIFANG)} href="javascript:;" className={this.state.tableType === Navs.KHPF_DIFANG ? "m2fmSub_a on" : "m2fmSub_a"}>考核评分</a>
          <a onClick={this.onTableChange.bind(this, Navs.FBKHRW_DIFANG)} href="javascript:;" className={this.state.tableType === Navs.FBKHRW_DIFANG ? "m2fmSub_a on" : "m2fmSub_a"}>发布考核任务</a>
        </div>
      )
    } else if (orgType === '地方党委' || orgType === '直属党委') {
      navEl = (
        <div className="m2fm_sub" style={{width: "253px", marginLeft: "270px"}}>
          <a onClick={this.onTableChange.bind(this, Navs.KHCJ_DW)} href="javascript:;" className={this.state.tableType === Navs.KHCJ_DW ? "m2fmSub_a on" : "m2fmSub_a"}>历届考核成绩</a>
          <a onClick={this.onTableChange.bind(this, Navs.KHPF_DW)} href="javascript:;" className={this.state.tableType === Navs.KHPF_DW ? "m2fmSub_a on" : "m2fmSub_a"}>考核评分</a>
        </div>
      )
    }

    // navEl = (
    //   <div className="m2fm_sub">
    //     <a onClick={this.onTableChange.bind(this, Navs.KHCJ)} href="javascript:;" className={this.state.tableType === Navs.KHCJ ? "m2fmSub_a on" : "m2fmSub_a"}>考核成绩</a>
    //     <a onClick={this.onTableChange.bind(this, Navs.KHPF)} href="javascript:;" className={this.state.tableType === Navs.KHPF ? "m2fmSub_a on" : "m2fmSub_a"}>考核评分</a>
    //     <a onClick={this.onTableChange.bind(this, Navs.KHPF_DW)} href="javascript:;" className={this.state.tableType === Navs.KHPF_DW ? "m2fmSub_a on" : "m2fmSub_a"}>党委考核评分</a>
    //     <a onClick={this.onTableChange.bind(this, 'FBKHRW')} href="javascript:;" className={this.state.tableType === 'FBKHRW' ? "m2fmSub_a on" : "m2fmSub_a"}>发布考核任务</a>
    //     <a onClick={this.onTableChange.bind(this, Navs.KHFASZ)} href="javascript:;" className={this.state.tableType === Navs.KHFASZ ? "m2fmSub_a on" : "m2fmSub_a"}>考核方案设置</a>
    //     <a onClick={this.onTableChange.bind(this, Navs.KHZBSZ)} href="javascript:;" className={this.state.tableType === Navs.KHZBSZ ? "m2fmSub_a on" : "m2fmSub_a"}>考核指标设置</a>
    //   </div>
    // )

    return (
      <div>
        {navEl}
        {tableEl}
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
)(DwgzKHPage);
