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
import LWJJFZ from "../../../components/members/lwjjfz/form"
import ZHUANCHU from "../../../components/members/zhuanchu/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  orgLeaders: Array<models.OrgLeader>
  displayName: string
  periodNum: number
}

class LJLDCY extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgLeaders: null,
      displayName: '',
      periodNum: 0
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.orgLeaders.list(orgID, false, this.state.displayName, this.state.periodNum, (err: models.Error, res: Array<models.OrgLeader>) => {
      this.setState({
        orgLeaders: res,
        displayName: this.state.displayName,
        periodNum: this.state.periodNum
      })
    })
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org.id)
  }

  render() {
    if (!this.state.orgLeaders) return <InnerLoading />

    const listEl = this.state.orgLeaders.map((orgLeader: models.OrgLeader) => {
      return (
        <tr key={orgLeader.id}>
          <td><a href={"/users/" + orgLeader.userName} target="_blank" className="cor_red">{orgLeader.displayName}</a></td>
          <td>{orgLeader.positionTitle}</td>
          <td>{orgLeader.periodNum}</td>
        </tr>
      )
    })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="#" className="m2fmPage_a">＜</a>
    //     <a href="#" className="m2fmPage_a on">1</a>
    //     <a href="#" className="m2fmPage_a">2</a>
    //     <a href="#" className="m2fmPage_a">3</a>
    //     <a href="#" className="m2fmPage_a">4</a>
    //     <a href="#" className="m2fmPage_a">5</a>
    //     <a href="#" className="m2fmPage_a">6</a>
    //     <a href="#" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="#" className="m2fmPage_a">99</a>
    //     <a href="#" className="m2fmPage_a">100</a>
    //     <a href="#" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input value={this.state.displayName} onChange={this.onChange.bind(this, 'displayName')} type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">换届届数：</span>
          <input value={this.state.periodNum ? this.state.periodNum + '' : ''} onChange={this.onChange.bind(this, 'periodNum')} type="text" name="" className="m2fm_int m2fm_int6" />
          <input onClick={this.onSearch.bind(this)} type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
        <table width="100%">
          <tbody>
            <tr className="m2th">
              <td className="center">姓名</td>
              <td className="center">曾任职务</td>
              <td className="center">届数</td>
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
)(LJLDCY);
