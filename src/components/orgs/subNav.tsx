import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'

interface P {
  isManage: boolean
  params: {
    id: number
  }
}

class SubNav extends React.Component<P, {}> {
  render() {
    return (
      <div className="m2fmNav">
        <ul>
          <li style={{display: this.props.isManage ? "block" : "none"}}><Link to={links.ORGS_JG} className="m2fm_a1" activeClassName="m2fm_a2">组织架构</Link></li>
          <li style={{display: this.props.isManage ? "block" : "none"}}><Link to={links.ORGS_GL} className="m2fm_a1" activeClassName="m2fm_a2">组织管理</Link></li>
          <li><Link to={links.ORGS_HJ} className="m2fm_a1" activeClassName="m2fm_a2">换届选举</Link></li>
          <li><Link to={links.ORGS_LD} className="m2fm_a1" activeClassName="m2fm_a2">领导成员管理</Link></li>
          <li><Link to={links.ORGS_DT} className="m2fm_a1" activeClassName="m2fm_a2">组织动态管理</Link></li>
          <li><Link to={links.ORGS_SZ} className="m2fm_a1" activeClassName="m2fm_a2">机构设置</Link></li>
        </ul>
      </div>
    )
  }
}

export default SubNav
