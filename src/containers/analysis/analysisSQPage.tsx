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
      tableType: constants.AnalysisTypes.SQRTJ
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === constants.AnalysisTypes.SQRTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.SQRTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.JJFZTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.JJFZTJ} />
    } else if (this.state.tableType === constants.AnalysisTypes.PYDXTJ) {
      tableEl = <FemaleMinorityAgeEducation analysisType={constants.AnalysisTypes.PYDXTJ} />
    }

    const orgType = this.props.orgState.org.orgType
    let navEl = null

    navEl = (
      <div className="m2fm_sub" style={{    width: "400px", margin: "-20px 0px 18px 302px"}}>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.SQRTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.SQRTJ ? "m2fmSub_a on" : "m2fmSub_a"}>申请人统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.JJFZTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.JJFZTJ ? "m2fmSub_a on" : "m2fmSub_a"}>积极分子统计</a>
        <a onClick={this.onTableChange.bind(this, constants.AnalysisTypes.PYDXTJ)} href="javascript:;" className={this.state.tableType === constants.AnalysisTypes.PYDXTJ ? "m2fmSub_a on" : "m2fmSub_a"}>培养对象统计</a>
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
