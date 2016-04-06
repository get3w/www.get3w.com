import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  record: models.Record
  openMain: (mainType: string) => void
}

export default class List extends React.Component<P, {}> {
  constructor(props) {
    super(props)
    this.state = {
      record: null
    }
  }

  render() {
    return (
      <div>
        <div className="m2per_u2">
          <ul>
            <li>
              <strong className="m2per_sbnm">变动类型：</strong>
              <div className="m2per_txtInfo">{this.props.record.type2}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">变动时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(this.props.record.happenDate) }</div>
            </li>
            <li>
              <strong className="m2per_sbnm">备注：</strong>
              <div className="m2per_txtInfo">{this.props.record.remarks}</div>
            </li>
          </ul>
        </div>
        <div className="m2btnBox2">
          <a onClick={this.props.openMain.bind(this, 'add') } href="javascript:;" className="m2per_abtn">修 改</a>
        </div>
      </div>
    )
  }
}
