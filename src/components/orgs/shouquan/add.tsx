import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  orgAdminUserNames: Array<string>
  openMain: (mainType: string, orgAdminUserNames: Array<string>) => void
}

interface S {
  keyword: string
  users: Array<models.User>
  user: models.User
}

export default class Add extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      keyword: null,
      users: null,
      user: null
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      keyword: null,
      users: null,
      user: null
    })
  }

  onChange(e) {
    this.state.keyword = e.target.value
    this.setState(this.state);
  }

  onRadioClick(user: models.User, e) {
    this.state.user = user
    this.setState(this.state);
  }

  onSearch(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    
  }

  onSubmit(e) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    const orgAdmin = new models.OrgAdmin()
    orgAdmin.orgID = this.props.org.id
    orgAdmin.userName = this.state.user.userName
    orgAdmin.displayName = this.state.user.displayName
    if (this.props.org.orgType === '党支部' || this.props.org.orgType === '党总支') {
      orgAdmin.adminType = '组织委员'
    } else {
      orgAdmin.adminType = '党建主管'
    }

    client.orgAdmins.create(orgAdmin, (err, res) => {
      utils.DOM.loading(false)
      if (!err) {
        this.props.openMain('list', null)
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    let usersEl = null
    if (this.state.users) {
      let listEl = null
      if (this.state.users.length > 0) {
        listEl = []
        this.state.users.forEach((user: models.User) => {
          if (this.props.orgAdminUserNames.indexOf(user.userName) !== -1) return
          listEl.push(
            <li key={user.id}>
              <input onClick={this.onRadioClick.bind(this, user)} className="lay-rad" name="a" type="radio" value="" />
              {user.displayName}
            </li>
          )
        })
      } else {
        listEl = <div>无搜索结果</div>
      }
      usersEl = (
        <div className="m2fmLayer">
          <div className="m2fm_srcBox">
            <ul>
              {listEl}
            </ul>
          </div>
        </div>
      )
    }

    let submitEl = null
    if (this.state.user) {
      submitEl = <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
    }

    return (
      <div>
        <div className="m2fmUnm" style={{height: "200px"}}>
          <span className="m2fm_s1">姓  名</span>
          <input value={this.state.keyword} onChange={this.onChange.bind(this)} type="text" name="" className="m2fm_int" />
          <input onClick={this.onSearch.bind(this)} type="submit" value="" className="m2submit" name="" />
        </div>
        <div className="m2btnBox2 m2btnBox2a">
          {submitEl}
          <a href="javascript:;" className="m2btn_a2" onClick={this.props.openMain.bind(this, 'list') }>取 消</a>
        </div>
        {usersEl}
      </div>
    )
  }
}
