import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'

class SubNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2fmNav">
       <ul>
        <li><Link to={links.PARTY_MEMBERS_DY} className="m2fm_a1" activeClassName="m2fm_a2">党员管理</Link></li>
        <li><Link to={links.PARTY_MEMBERS_YB} className="m2fm_a1" activeClassName="m2fm_a2">预备党员管理</Link></li>
        <li><Link to={links.PARTY_MEMBERS_LD} className="m2fm_a1" activeClassName="m2fm_a2">流动党员管理</Link></li>
        <li><Link to={links.PARTY_MEMBERS_ZZ} className="m2fm_a1" activeClassName="m2fm_a2">组织关系转接管理</Link></li>
        <li><Link to={links.PARTY_MEMBERS_LS} className="m2fm_a1" activeClassName="m2fm_a2">历史党员管理</Link></li>
       </ul>
      </div>
    )
  }
}

export default SubNav
