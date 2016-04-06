import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import XinZeng from './xinzeng';
import XuanZe from './xuanze';

interface P {
  user: models.User
  onClose: Function
  solution: models.TestSolution
}

interface S {
  winType: string
  solution: models.TestSolution
  metricIDs: Array<number>
}

export default class DKXXJL extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: 'xinzeng',
      solution: props.solution || new models.TestSolution(),
      metricIDs: null
    }
  }

  onMain(winType: string, solution: models.TestSolution, metricIDs: Array<number>) {
    this.state.winType = winType
    this.state.solution = solution
    this.state.metricIDs = metricIDs
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (this.state.winType === 'xinzeng') {
      mainEl = <XinZeng user={this.props.user} solution={this.state.solution} metricIDs={this.state.metricIDs} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'xuanze') {
      mainEl = <XuanZe solution={this.state.solution} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
