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
import DYJBXX from "./dy/dyjbxx"
import DYNLTJ from "./dy/dynltj"
import DYXLTJ from "./dy/dyxltj"
import DYMZTJ from "./dy/dymztj"
import RDSJTJ from "./dy/rdsjtj"
import LRDYTJ from "./dy/lrdytj"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  tableType: string
}

class DwgzKHPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tableType: constants.AnalysisTypes.DYJBXX
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === constants.AnalysisTypes.DYJBXX) {
      tableEl = <DYJBXX analysisType={this.state.tableType} />
    } else if (this.state.tableType === constants.AnalysisTypes.DYNLTJ) {
      tableEl = <DYNLTJ analysisType={this.state.tableType} />
    } else if (this.state.tableType === constants.AnalysisTypes.DYXLTJ) {
      tableEl = <DYXLTJ analysisType={this.state.tableType} />
    } else if (this.state.tableType === constants.AnalysisTypes.DYMZTJ) {
      tableEl = <DYMZTJ analysisType={this.state.tableType} />
    } else if (this.state.tableType === constants.AnalysisTypes.RDSJTJ) {
      tableEl = <RDSJTJ analysisType={this.state.tableType} />
    } else if (this.state.tableType === constants.AnalysisTypes.LRDYTJ) {
      tableEl = <LRDYTJ analysisType={this.state.tableType} />
    }

    const orgType = this.props.orgState.org.orgType
    let navEl = null

    navEl = (
      <div className="m2fm_sub" style={{ width: "794px", margin: "-20px 0px 18px 12px" }}>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.DYJBXX)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.DYJBXX ? "m2fmSub_a on" : "m2fmSub_a"}>党员基本信息</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.DYNLTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.DYNLTJ ? "m2fmSub_a on" : "m2fmSub_a"}>党员年龄统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.DYXLTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.DYXLTJ ? "m2fmSub_a on" : "m2fmSub_a"}>党员学历统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.DYMZTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.DYMZTJ ? "m2fmSub_a on" : "m2fmSub_a"}>党员民族统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.RDSJTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.RDSJTJ ? "m2fmSub_a on" : "m2fmSub_a"}>入党时间统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.LRDYTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.LRDYTJ ? "m2fmSub_a on" : "m2fmSub_a"}>流入党员统计</a>
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
)(DwgzKHPage);
