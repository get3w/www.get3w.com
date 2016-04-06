import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links'
import * as states from '../../constants/states'

class SubNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2fmNav">
        <ul>
          <li><Link to={links.ANALYSIS_GZ} className="m2fm_a1" activeClassName="m2fm_a2">工作办理情况统计</Link></li>
          <li><Link to={links.ANALYSIS_DY} className="m2fm_a1" activeClassName="m2fm_a2">党员信息统计</Link></li>
          <li><Link to={links.ANALYSIS_ZZ} className="m2fm_a1" activeClassName="m2fm_a2">党组织信息统计</Link></li>
          <li><Link to={links.ANALYSIS_SQ} className="m2fm_a1" activeClassName="m2fm_a2">申请人统计</Link></li>
        </ul>
      </div>
    )
  }
}

export default SubNav
