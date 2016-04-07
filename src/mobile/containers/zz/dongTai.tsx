import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links';
import SubNav from '../../components/zz/subNav'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as states from '../../../constants/states';
import client from '../../../lib/client';
import * as utils from '../../../lib/utils';
import { MainType } from './indexPage'

interface P {
  orgRoot: models.Org
  org: models.Org
  onMainChange: (mainType: string, org: models.Org) => void
}

interface S {
  oas: Array<models.OrgActivity>
  title: string
  winType: string
  id: number
}

export default class DongTaiPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      oas: null,
      title: '',
      winType: '',
      id: null
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.id)
  }

  load(orgID: number) {
    
  }

  render() {
    if (!this.state.oas) return <InnerLoading />

    const listEl = this.state.oas.map((oa: models.OrgActivity) => {
      return (
        <li key={oa.id} className="clearfix">
          <div className="m2u2_time">2016-03-17</div>
          <Link to={'/content/' + oa.id}><strong>{oa.title}</strong></Link>
          <p>{oa.content.substr(0, 40)}</p>
        </li>
      )
    })

    return (
      <div>
        <div className="mTop">
          <Link to={links.INDEX} className="mTop_back"></Link>
          组织
          <a onClick={this.props.onMainChange.bind(this, MainType.QIEHUAN, this.props.orgRoot)} href="javascript:;" className="mTop_btn">切换组织</a>
        </div>
        <div className="m2topMes">当前组织：{this.props.org.orgName}</div>
        <SubNav mainType={MainType.DONGTAI} onMainChange={this.props.onMainChange} org={this.props.org} />
        <ul className="m2u2 m2u2a">
          {listEl}
        </ul>
      </div>
    )
  }
}
