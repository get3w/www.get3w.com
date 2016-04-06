import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import List from './list'
import Upload from './upload'
import New from './new'

interface P {
  isOp: boolean
  user: models.User
  org: models.Org
  onClose: Function
}

interface S {
  mainType: string
  lr: models.LearnRecord
}

export default class DKXXJL extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: 'list',
      lr: null
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      mainType: 'list',
      lr: null
    })
  }

  onMainChange(mainType: string, lr: models.LearnRecord, e) {
    this.setState({
      mainType: mainType,
      lr: lr
    })
  }

  render() {
    let mainEl = null
    if (this.state.mainType === 'list') {
      mainEl = <List isOp={this.props.isOp} user={this.props.user} org={this.props.org} onMainChange={this.onMainChange.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.mainType === 'upload') {
      mainEl = <Upload user={this.props.user} org={this.props.org} lr={this.state.lr} onMainChange={this.onMainChange.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.mainType === 'new') {
      mainEl = <New user={this.props.user} org={this.props.org} lr={this.state.lr} onMainChange={this.onMainChange.bind(this)} onClose={this.props.onClose.bind(this)} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
