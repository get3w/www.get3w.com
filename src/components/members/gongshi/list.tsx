import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  isOp: boolean
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
    let editBtnEl = null
    if (this.props.isOp) {
      editBtnEl = (
        <div className="m2btnBox2">
          <a onClick={this.props.openMain.bind(this, 'add') } href="javascript:;" className="m2per_abtn">修 改</a>
        </div>
      )
    }

    return (
      <div>
        <div className="m2per_u2">
          <ul>
            <li>
              <strong className="m2per_sbnm">公示时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(this.props.record.happenDate) }</div>
            </li>
            <li>
              <div>{this.props.record.remarks}</div>
            </li>
          </ul>
        </div>
        {editBtnEl}
      </div>
    )
  }
}
