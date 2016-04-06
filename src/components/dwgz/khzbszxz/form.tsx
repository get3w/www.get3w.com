import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import ZhiBiao from './zhibiao';
import XiangMu from './xiangmu';

interface P {
  typeNames: Array<string>
  metric: models.TestMetric
  onClose: (isReload: boolean) => void
}

interface S {
  winType: string
  typeName: string
}

export default class Form extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: 'zhibiao',
      typeName: ''
    }
  }

  onMain(winType: string, typeName: string) {
    if (typeName) {
      this.state.typeName = typeName
    }
    this.state.winType = winType
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (this.state.winType === 'zhibiao') {
      mainEl = <ZhiBiao typeName={this.state.typeName} metric={this.props.metric} typeNames={this.props.typeNames} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'xiangmu') {
      mainEl = <XiangMu onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
