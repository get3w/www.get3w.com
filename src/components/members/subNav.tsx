import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'

class SubNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2fmNav">
       <ul>
        <li><Link to={links.MEMBERS_SQ} className="m2fm_a1" activeClassName="m2fm_a2">申请人管理</Link></li>
        <li><Link to={links.MEMBERS_JJ} className="m2fm_a1" activeClassName="m2fm_a2">积极分子管理</Link></li>
        <li><Link to={links.MEMBERS_FZ} className="m2fm_a1" activeClassName="m2fm_a2">发展对象管理</Link></li>
        <li><Link to={links.MEMBERS_YB} className="m2fm_a1" activeClassName="m2fm_a2">预备党员管理</Link></li>
       </ul>
      </div>
    )
  }
}

export default SubNav
