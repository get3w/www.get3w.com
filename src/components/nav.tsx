import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router';
import * as links from '../constants/links'

interface P {
  isAdminOrLeader: boolean
  isDWGZ: boolean
}

class Nav extends React.Component<P, {}> {
  render() {
    const isAdminOrLeader = this.props.isAdminOrLeader
    const isDWGZ = this.props.isDWGZ

    return (
      <div className="nav">
        <ul>
          <li>
            <IndexLink to={links.INDEX} className="nav_a" activeClassName="on">首  页</IndexLink>
          </li>
          <li style={{display: isDWGZ ? "block" : "none"}}>
            <Link to={links.DWGZ} className="nav_a" activeClassName="on">党委工作</Link>
          </li>
          <li style={{display: isAdminOrLeader ? "block" : "none"}}>
            <Link to={links.ORGS} className="nav_a" activeClassName="on">党组织</Link>
          </li>
          <li style={{display: isAdminOrLeader ? "block" : "none"}}>
            <Link to={links.PARTY_MEMBERS} className="nav_a" activeClassName="on">党员管理</Link>
          </li>
          <li style={{display: isAdminOrLeader ? "block" : "none"}}>
            <Link to={links.MEMBERS} className="nav_a" activeClassName="on">党员发展</Link>
          </li>
          <li>
            <a href="#" className="nav_a">党费管理</a>
          </li>
          <li>
            <Link to={links.ACTIVITIES} className="nav_a" activeClassName="on">组织生活</Link>
          </li>
          <li style={{display: isAdminOrLeader ? "block" : "none"}}>
            <Link to={links.MEETINGS} className="nav_a" activeClassName="on">会议纪要</Link>
          </li>
          <li style={{display: isAdminOrLeader ? "block" : "none"}}>
            <Link to={links.ANALYSIS} className="nav_a" activeClassName="on">统计查询</Link>
          </li>
          <li>
            <a href="#" className="nav_a">学习发展</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
