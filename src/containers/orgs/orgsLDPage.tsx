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
import XRLDCY from "./ld/xrldcy"
import LJLDCY from "./ld/ljldcy"

interface P {
  actions?: any,
  authState?: states.AuthState,
  params: {
    id: number
  }
}

interface S {
  tableType: string
}

class OrgsLDPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tableType: 'XRLDCY'
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === 'XRLDCY') {
      tableEl = <XRLDCY />
    } else if (this.state.tableType === 'LJLDCY') {
      tableEl = <LJLDCY />
    }

    return (
      <div>
        <div className="m2fm_sub">
          <a onClick={this.onTableChange.bind(this, 'XRLDCY')} href="javascript:;" className={this.state.tableType === 'XRLDCY' ? "m2fmSub_a on" : "m2fmSub_a"}>现任领导成员</a>
          <a onClick={this.onTableChange.bind(this, 'LJLDCY')} href="javascript:;" className={this.state.tableType === 'LJLDCY' ? "m2fmSub_a on" : "m2fmSub_a"}>历届领导成员</a>
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
)(OrgsLDPage);
