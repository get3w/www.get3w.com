import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  user: models.User
  culturist: models.Culturist
  culturistUserNames: Array<string>
  openMain: (mainType: string, culturist: models.Culturist, culturistUserNames: Array<string>) => void
}

interface S {
  culturist: models.Culturist
  users: Array<models.User>
  keyword: string
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      culturist: null,
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
    if (this.props.culturist) {
      const culturistOld = this.props.culturist
      culturistOld.isCurrent = false
      culturistOld.endTime = new Date()
      client.culturists.edit(culturistOld, (err: models.Error, res: {}) => {
        if (err) {
          utils.DOM.loading(false)
          utils.Swal.error(err)
        } else {
          this.createCulturist(user)
        }
      })
    } else {
      this.createCulturist(user)
    }
  }

  createCulturist(user: models.User) {
    const culturist = new models.Culturist()
    culturist.userName = this.props.user.userName
    culturist.culturistUserName = user.userName
    culturist.culturistDisplayName = user.displayName
    culturist.isCurrent = true
    culturist.startTime = new Date()
    client.culturists.create(culturist, (err: models.Error, res: {}) => {

    })
  }

  render() {
    const culturistUserNames = this.props.culturistUserNames || []
    let resultEl = null
    if (this.state.users && this.state.users.length) {
      const listEl = []
      this.state.users.forEach((user: models.User) => {
        if (culturistUserNames.indexOf(user.userName) === -1) {
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
