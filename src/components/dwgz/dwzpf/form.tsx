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
  user: models.User
  org: models.Org
  exam: models.TestExam
  onClose: Function
}

interface S {
  winType: string
  result: models.TestExamResult
}

export default class DKXXJL extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      winType: 'list',
      result: null
    }
  }

  onMain(winType: string, result: models.TestExamResult) {
    this.state.winType = winType
    this.state.result = result
    this.setState(this.state)
  }

  render() {
    let mainEl = null
    if (this.state.winType === 'list') {
      mainEl = <List org={this.props.org} exam={this.props.exam} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'view') {
      mainEl = <View resultID={this.state.result.id} user={this.props.user} isUpload={false} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'upload') {
      mainEl = <View resultID={this.state.result.id} user={this.props.user} isUpload={true} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    } else if (this.state.winType === 'link') {
      mainEl = <Link result={this.state.result} org={this.props.org} onMain={this.onMain.bind(this)} onClose={this.props.onClose.bind(this)} />
    }

    return (
      <div>
        <div className="layerBg"></div>
        {mainEl}
      </div>
    )
  }
}
