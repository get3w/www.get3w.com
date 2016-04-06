import * as React from 'react'
import { Link } from 'react-router'
import * as links from '../../constants/links';
import * as models from '../../../api/models';
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import { MainType } from './indexPage'

interface P {
  orgRoot: models.Org
  org: models.Org
  onMainChange: (mainType: string, org: models.Org) => void
}

interface S {
  orgs: Array<models.Org>
}

export default class Page extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      orgs: null
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.id)
  }

  load(orgID: number) {
    client.orgs.list(orgID, false, (err: models.Error, res: Array<models.Org>) => {
      this.setState({
        orgs: res,
      })
    })
  }

  render() {
    if (!this.state.orgs) return <InnerLoading />

    const listEl = this.state.orgs.map((org: models.Org) => {
      let subEl = null
      if (org.childrenCount > 0) {
        subEl = <a onClick={this.props.onMainChange.bind(this, MainType.QIEHUAN, org)} href="javascript:;" className="m2u4_link">子组织</a>
      }
      return (
        <li key={org.id} className="clearfix">
          <div className="m2u4_nm">
            <a onClick={this.props.onMainChange.bind(this, MainType.DONGTAI, org)} className="on" href="javascript:;">{org.orgName}</a>
          </div>
          {subEl}
        </li>
      )
    })

    return (
      <div>
        <div className="mTop">
          <a onClick={() => {
            if (this.props.org === this.props.orgRoot) {
              this.props.onMainChange(MainType.DONGTAI, this.props.orgRoot)
            } else {
              this.props.onMainChange(MainType.QIEHUAN, this.props.orgRoot)
            }
          }} href="javascript:;" className="mTop_back"></a>
          切换组织
        </div>
        <div className="m2ld_bx2">
          <a onClick={this.props.onMainChange.bind(this, MainType.DONGTAI, this.props.org)} className="on" href="javascript:;">{this.props.org.orgName}</a>
        </div>
        <ul className="m2u4">
          {listEl}
        </ul>
      </div>
    )
  }
}
