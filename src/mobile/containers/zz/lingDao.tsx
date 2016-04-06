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
  ols: Array<models.OrgLeader>
}

export default class Page extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ols: null,
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.id)
  }

  load(orgID: number) {
    client.orgLeaders.list(orgID, true, '', 0, (err: models.Error, res: Array<models.OrgLeader>) => {
      this.setState({
        ols: res,
      })
      this.state.ols.forEach((ol: models.OrgLeader) => {
        
      })
    })
  }

  render() {
    if (!this.state.ols) return <InnerLoading />

    const listEl = this.state.ols.map((ol: models.OrgLeader) => {
      let avatarUrl = ol.avatarUrl || "/assets/mobile/images/mldImg.jpg"
      return (
        <li key={ol.id} className="clearfix">
          <div className="autoImg m2ldImg"><img src={avatarUrl} /></div>
          <strong>{ol.displayName}</strong>
          <div className="m2u3_bx">党内职务：{ol.positionTitle}</div>
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
        <SubNav mainType={MainType.LINGDAO} onMainChange={this.props.onMainChange} org={this.props.org} />
        <ul className="m2u3">
          {listEl}
        </ul>
      </div>
    )
  }
}
