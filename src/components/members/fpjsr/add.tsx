import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  org: models.Org
  introducer: models.Introducer
  introducerUserNames: Array<string>
  openMain: (mainType: string, introducer: models.Introducer, introducerUserNames: Array<string>) => void
}

interface S {
  introducer: models.Introducer
  users: Array<models.User>
  keyword: string
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      introducer: null,
      users: [],
      keyword: ''
    }
  }

  onChange(e) {
    this.state.keyword = e.target.value
    this.setState(this.state);
  }

  onSearch() {
    utils.DOM.loading(true)

  }

  onSubmit(user: models.User, e) {
    utils.DOM.loading(true)
    if (this.props.introducer) {
      const introducerOld = this.props.introducer
      introducerOld.isCurrent = false
      introducerOld.endTime = new Date()
      client.introducers.edit(introducerOld, (err: models.Error, res: {}) => {
        if (err) {
          utils.DOM.loading(false)
          utils.Swal.error(err)
        } else {
          this.createIntroducer(user)
        }
      })
    } else {
      this.createIntroducer(user)
    }
  }

  createIntroducer(user: models.User) {
    const introducer = new models.Introducer()
    introducer.userName = this.props.user.userName
    introducer.introducerUserName = user.userName
    introducer.introducerDisplayName = user.displayName
    introducer.isCurrent = true
    introducer.startTime = new Date()
    client.introducers.create(introducer, (err: models.Error, res: {}) => {
      const summary = this.props.user.orgName + ' 被分配培养人（'+introducer.introducerDisplayName+'）'
    })
  }

  render() {
    const introducerUserNames = this.props.introducerUserNames || []
    let resultEl = null
    if (this.state.users && this.state.users.length) {
      const listEl = []
      this.state.users.forEach((user: models.User) => {
        if (introducerUserNames.indexOf(user.userName) === -1) {
          listEl.push(<div className="layer_serS1">
            <input onClick={this.onSubmit.bind(this, user)} className="lay-rad" name="" type="radio" value="" />
            {user.displayName}
          </div>)
        }
      })
      resultEl = (
        <div className="layer_serBx1">
          {listEl}
        </div>
      )
    }
    return (
      <div>
        <div className="m2fmUnm">
          <span className="m2fm_s1">姓  名</span>
          <input value={this.state.keyword} onChange={this.onChange.bind(this)} type="text" className="m2fm_int" />
          <input onClick={this.onSearch.bind(this)} type="submit" value="" className="m2submit" name="" />
        </div>
        {resultEl}
        <div className="m2btnBox2 m2btnBox2a" style={{marginTop: "30px"}}>
          <a href="javascript:;" className="m2btn_a2" onClick={this.props.openMain.bind(this, '', null, null) }>取 消</a>
        </div>
      </div>
    )
  }
}
