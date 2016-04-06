import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import List from './list'
import Add from './add'

interface P {
  org: models.Org
  user: models.User
  isOp: boolean
  onClose: Function
}

interface S {
  mainType: string
  introducer: models.Introducer
  introducerUserNames: Array<string>
}

export default class FPJSR extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: '',
      introducer: null,
      introducerUserNames: []
    }
  }

  openMain(mainType: string, introducer: models.Introducer, introducerUserNames: Array<string>, e) {
    this.state.mainType = mainType
    this.state.introducer = introducer
    this.state.introducerUserNames = introducerUserNames || []
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (!this.state.mainType) {
      mainEl = <List isOp={this.props.isOp} openMain={this.openMain.bind(this)} user={this.props.user} />
    } else if (this.state.mainType === 'add') {
      mainEl = <Add org={this.props.org} openMain={this.openMain.bind(this)} user={this.props.user} introducer={this.state.introducer} introducerUserNames={this.state.introducerUserNames} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b" style={{ height: "392px", marginTop: "-196px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">介绍人管理</div>
          {mainEl}
        </div>
      </div>
    )
  }
}
