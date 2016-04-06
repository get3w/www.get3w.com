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
import DYZCQK from "./ls/dyzcqk"
import DYBDQK from "./ls/dybdqk"
import CLRDYQK from "./ls/clrdyqk"

interface P {
  actions?: any,
  authState?: states.AuthState,
}

interface S {
  tableType: string
}

class PartyMembersLSPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tableType: 'DYZCQK'
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === 'DYZCQK') {
      tableEl = <DYZCQK />
    } else if (this.state.tableType === 'DYBDQK') {
      tableEl = <DYBDQK />
    } else if (this.state.tableType === 'CLRDYQK') {
      tableEl = <CLRDYQK />
    }

    return (
      <div>
        <div className="m2fm_sub">
          <a onClick={this.onTableChange.bind(this, 'DYZCQK')} href="javascript:;" className={this.state.tableType === 'DYZCQK' ? "m2fmSub_a on" : "m2fmSub_a"}>党员转出情况</a>
          <a onClick={this.onTableChange.bind(this, 'DYBDQK')} href="javascript:;" className={this.state.tableType === 'DYBDQK' ? "m2fmSub_a on" : "m2fmSub_a"}>党员变动情况</a>
          <a onClick={this.onTableChange.bind(this, 'CLRDYQK')} href="javascript:;" className={this.state.tableType === 'CLRDYQK' ? "m2fmSub_a on" : "m2fmSub_a"}>曾流入党员情况</a>
        </div>
        {tableEl}
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyMembersLSPage);
