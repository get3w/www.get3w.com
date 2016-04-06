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
  user: models.User
  org: models.Org
  onClose: Function
}

interface S {
  mainType: string
  record: models.Record
}

export default class BIANDONG extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: '',
      record: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.user.userName)
  }

  componentDidMount() {
    this.load(this.props.user.userName)
  }

  load(userName: string) {
    client.records.search(userName, '党员变动', (err: models.Error, res: Array<models.Record>) => {
      if (res && res.length) {
        this.state.record = res[0]
        this.state.mainType = 'list'
        this.setState(this.state)
      } else {
        this.state.mainType = 'add'
        this.setState(this.state)
      }
    })
  }

  openMain(mainType: string, e) {
    if (this.state.record) {
      this.state.mainType = mainType
      this.setState(this.state)
    } else {
      this.props.onClose()
    }
  }

  render() {
    let mainEl = null
    if (this.state.mainType == 'list') {
      mainEl = <List openMain={this.openMain.bind(this)} user={this.props.user} record={this.state.record} />
    } else if (this.state.mainType === 'add') {
      mainEl = <Add openMain={this.openMain.bind(this)} user={this.props.user} org={this.props.org} record={this.state.record} />
    }

    return (
      <div>
      <div className="layerBg"></div>
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 355, width: 518, marginLeft: '-259px', marginTop: '-177px' }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
        <div className="layer_t">党员变动</div>
          {mainEl}
        </div>
      </div>
    )
  }
}
