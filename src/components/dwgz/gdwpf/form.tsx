import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import List from './list';
import View from './view';
import Link from './link';

interface P {
  exam: models.TestExam
  onClose: Function
}

interface S {
  winType: string
}

export default class DKXXJL extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: 'list',
    }
  }

  onMain(winType: string) {
    this.state.winType = winType
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (this.state.winType === 'list') {
      mainEl = <List exam={this.props.exam} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'view') {
      mainEl = <View onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'link') {
      mainEl = <Link onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
