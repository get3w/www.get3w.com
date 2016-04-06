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

interface P {
  analysisType: string
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  results: Array<{
    orgID: number
    orgName: string
    count1: number
    count2: number
    count3: number
    count4: number
    count5: number
    count6: number
    count7: number
    total: number
  }>
  controls: { [index: string]: boolean }
  orgID: number
  orgName: string
}

class DYBDQK extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      controls: {},
      orgID: null,
      orgName: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState.org.id, nextProps.analysisType)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id, this.props.analysisType)
  }

  load(orgID: number, analysisType: string) {
    this.state.orgID = orgID
    utils.DOM.loading(true)
    client.analysis.PartyMembers(analysisType, this.state.orgID, (err: models.Error, res) => {
      utils.DOM.loading(false)
      this.state.results = res
      this.setState(this.state)
    })
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onSearch(e) {
    this.load(this.state.orgID, this.props.analysisType)
  }

  onValueChange(orgID: number, orgName: string) {
    this.state.orgID = orgID
    this.state.orgName = orgName
    this.state.controls['orgName'] = false
    this.setState(this.state)
  }

  render() {
    if (!this.state.results) return <InnerLoading />

    let orgNamesEl = []
    let listEl = this.state.results.map((result) => {
      orgNamesEl.push(<dd key={result.orgID} onClick={this.onValueChange.bind(this, result.orgID, result.orgName) }>{result.orgName}</dd>)
      return (
        <tr key={result.orgID}>
          <td className="m2tabs_ltd">{result.orgName}</td>
          <td className="center">{result.count1}</td>
          <td className="m2tabs_rtd center">{result.count2}</td>
        </tr>
      )
    })

    return (
      <div>
        <div className="m2fm_stop">
          <span className="m2fm_ss1">组织机构：</span>
          <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
            <input onClick={this.onClick.bind(this, 'orgName') } value={this.state.orgName ? this.state.orgName : '全部'} type="text" className="m2fm_int m2fm_int3" />
            <div className="m2fm_selBox" style={{ display: this.state.controls['orgName'] ? 'block' : 'none', width: 146 }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, this.props.orgState.org.id, '') }>全部</dd>
                {orgNamesEl}
              </dl>
            </div>
          </div>

          <a className="m2fm_pubBtn2" style={{ float: 'right', marginRight: 20 }} href="javascript:;">导 出</a>
          <a onClick={this.onSearch.bind(this) } className="m2fm_pubBtn1" style={{ float: 'right' }} href="javascript:;">搜索</a>
        </div>

        <div className="m2tabs">
          <table width="100%">
            <tbody>
              <tr className="m2tabs_th">
                <td className="m2tabs_ltd center">组  织 </td>
                <td className="center">汉族</td>
                <td className="center"> 少数民族</td>
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
)(DYBDQK);
