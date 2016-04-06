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
import List from "./zz/list"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  tableType: string
}

class PartyMembersZZPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      tableType: 'ZHUANCHU'
    }
  }

  onTableChange(tableType, e) {
    this.setState({
      tableType: tableType,
    })
  }

  render() {
    let tableEl = null
    if (this.state.tableType === 'ZHUANCHU') {
      tableEl = <List isZhuanChu={true} />
    } else if (this.state.tableType === 'ZHUANRU') {
      tableEl = <List isZhuanChu={false} />
    }

    let zcEl = null
    if (this.props.orgState.org.orgType === '地方党委' || this.props.orgState.org.orgType === '直属党委') {
      zcEl = <a onClick={this.onTableChange.bind(this, 'ZHUANRU')} href="javascript:;" className={this.state.tableType === 'ZHUANRU' ? "m2fmSub_a on" : "m2fmSub_a"}>转入</a>
    }

    return (
      <div>
        <div className="m2fm_sub" style={{width: "160px", margin: "-20px 0px 18px 352px"}}>
          <a onClick={this.onTableChange.bind(this, 'ZHUANCHU')} href="javascript:;" className={this.state.tableType === 'ZHUANCHU' ? "m2fmSub_a on" : "m2fmSub_a"}>转出</a>
          {zcEl}
        </div>
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
)(PartyMembersZZPage);
