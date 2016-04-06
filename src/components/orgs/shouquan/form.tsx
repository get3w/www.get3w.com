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
  onClose: Function
}

interface S {
  mainType: string
  orgAdmin: models.OrgAdmin
  orgAdminUserNames: Array<string>
}

export default class SHOUQUAN extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: 'list',
      orgAdmin: null,
      orgAdminUserNames: []
    }
  }

  openMain(mainType: string, orgAdminUserNames: Array<string>, e) {
    this.state.mainType = mainType
    this.state.orgAdminUserNames = orgAdminUserNames
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (this.state.mainType == 'list') {
      mainEl = <List openMain={this.openMain.bind(this)} org={this.props.org} />
    } else if (this.state.mainType === 'add') {
      mainEl = <Add org={this.props.org} openMain={this.openMain.bind(this)} orgAdminUserNames={this.state.orgAdminUserNames} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b" style={{ height: "392px", marginTop: "-196px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">组织授权</div>
          {mainEl}
        </div>
      </div>
    )
  }
}
