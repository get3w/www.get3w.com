import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links'
import * as models from '../../../api/models'
import { MainType } from '../../containers/zz/indexPage'

interface P {
  mainType: string
  org: models.Org
  onMainChange: (mainType: string, org: models.Org) => void
}

class SubNav extends React.Component<P, {}> {
  render() {
    return (
      <ul className="m2ms_itms">
        <li>
          <a onClick={this.props.onMainChange.bind(this, MainType.DONGTAI, this.props.org)} href="javascript:;" className={this.props.mainType === MainType.DONGTAI ? 'on' : ''}>组织动态</a>
        </li>
        <li>
          <a onClick={this.props.onMainChange.bind(this, MainType.LINGDAO, this.props.org)} href="javascript:;" className={this.props.mainType === MainType.LINGDAO ? 'on' : ''}>组织领导</a>
        </li>
        <li>
          <a onClick={this.props.onMainChange.bind(this, MainType.XINXI, this.props.org)} href="javascript:;" className={this.props.mainType === MainType.XINXI ? 'on' : ''}>组织信息</a>
        </li>
      </ul>
    )
  }
}

export default SubNav
