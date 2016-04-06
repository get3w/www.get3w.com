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
import FemaleMinorityAgeEducation from "./common/femaleMinorityAgeEducation"
import ProbationaryState from "./common/probationaryState"
import PartyMemberChange from "./common/partyMemberChange"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  tableType: string
}

class DwgzGZPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tableType: constants.AnalysisTypes.SQRDRSTJ
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === constants.AnalysisTypes.SQRDRSTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.SQRDRSTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.FZJJFZTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.FZJJFZTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.FZPYDXTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.FZPYDXTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.YBDYZZTJ) {
      tableEl = <ProbationaryState />
    } else if (this.state.tableType === constants.AnalysisTypes.FZDYTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.FZDYTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.DYRSBHTJ) {
      tableEl = <PartyMemberChange />
    }

    const orgType = this.props.orgState.org.orgType
    let navEl = null

    navEl = (
      <div className="m2fm_sub" style={{ width: "934px", margin: "-20px 0px 18px 0" }}>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.SQRDRSTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.SQRDRSTJ ? "m2fmSub_a on" : "m2fmSub_a"}>申请入党人数统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.FZJJFZTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.FZJJFZTJ ? "m2fmSub_a on" : "m2fmSub_a"}>发展积极分子统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.FZPYDXTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.FZPYDXTJ ? "m2fmSub_a on" : "m2fmSub_a"}>发展培养对象统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.YBDYZZTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.YBDYZZTJ ? "m2fmSub_a on" : "m2fmSub_a"}>预备党员转正统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.FZDYTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.FZDYTJ ? "m2fmSub_a on" : "m2fmSub_a"}>发展党员统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.DYRSBHTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.DYRSBHTJ ? "m2fmSub_a on" : "m2fmSub_a"}>党员人数变化统计</a>
      </div>
    )

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
)(DwgzGZPage);
