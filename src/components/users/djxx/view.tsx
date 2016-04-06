import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
}

interface S {
  orgLeaders: Array<models.OrgLeader>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgLeaders: null,
    }
  }

  componentDidMount() {
    this.load(this.props.user.userName)
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.user.userName)
  }

  load(userName: string) {
    client.orgLeaders.searchByUserName(userName, (err: models.Error, res: Array<models.OrgLeader>) => {
      this.setState({
        orgLeaders: res
      })
    })
  }

  render() {
    const user = this.props.user

    let leadersEl = null
    if (this.state.orgLeaders && this.state.orgLeaders.length) {
      leadersEl = this.state.orgLeaders.map((orgLeader: models.OrgLeader) => {
        return (
          <span>{orgLeader.orgName} {orgLeader.positionTitle}<br /></span>
        )
      })
    }
    else{
      leadersEl = '党员'
    }

    return (
      <div className="m2per_u2">
        <ul>
          <li>
            <strong className="m2per_sbnm">用户类型：</strong>
            <div className="m2per_txtInfo">{user.userType}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">党内职务：</strong>
            <div className="m2per_txtInfo">
              {leadersEl}
            </div>
          </li>
          <li>
            <strong className="m2per_sbnm">申请入党时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.applyPartyDate)}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">转为积极分子时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.toActivistDate)}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">列为发展对象时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.toDevelopmentObDate)}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">预备期开始时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.partyDate)}</div>
          </li>
          <li>
            <strong className="m2per_sbnm">转正时间：</strong>
            <div className="m2per_txtInfo">{utils.Translate.toShortDate(user.toFullmembersDate)}</div>
          </li>
        </ul>
      </div>
    )
  }
}
