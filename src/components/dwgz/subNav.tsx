import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'

class SubNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2fmNav">
        <ul>
          <li><a href="javascript:;" className="m2fm_a1">书记述职</a></li>
          <li><a href="javascript:;" className="m2fm_a1">任务管理</a></li>
          <li><a href="javascript:;" className="m2fm_a1">干部队伍建设</a></li>
          <li><Link to={links.DWGZ_KH} className="m2fm_a1" activeClassName="m2fm_a2">工作考核</Link></li>
        </ul>
      </div>
    )
  }
}

export default SubNav
