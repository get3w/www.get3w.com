import * as React from 'react'
import * as _ from 'lodash'
import * as is from 'is_js'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  isSelfOrOp: boolean
}

interface S {
  currentPassword: string
  password: string
  confirmPassword: string
  errors: { [index: string]: boolean }
}

export default class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      currentPassword: '',
      password: '',
      confirmPassword: '',
      errors: {}
    })
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state)
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    let errors = {}
    if (!this.state.password) {
      errors['password'] = true
    }
    if (!this.state.confirmPassword || this.state.confirmPassword != this.state.password) {
      errors['confirmPassword'] = true
    }
    if (_.keys(errors).length > 0) {
      this.state.errors = errors
      this.setState(this.state)
      return
    }

    utils.DOM.loading(true)
    
  }

  render() {
    if (!this.props.isSelfOrOp) return null

    return (
      <div>
        <div className="m2fm_u1 m2per_u4">
          <ul>
            <li>
              <span className="m2fm_us1">用户名：</span>
              {this.props.user.userName}
            </li>
            <li>
              <span className="m2fm_us1">当前密码：</span>
              <input type="password" value={this.state.currentPassword} onChange={this.onChange.bind(this, 'currentPassword') } className="m2fm_u1Int" />
            </li>
            <li>
              <span className="m2fm_us1">密码：</span>
              <input type="password" value={this.state.password} onChange={this.onChange.bind(this, 'password') } className={this.state.errors['password'] ? 'm2fm_u1Int error' : 'm2fm_u1Int'}  />
            </li>
            <li>
              <span className="m2fm_us1">确认密码：</span>
              <input type="password" value={this.state.confirmPassword} onChange={this.onChange.bind(this, 'confirmPassword') } className={this.state.errors['confirmPassword'] ? 'm2fm_u1Int error' : 'm2fm_u1Int'}  />
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm_sbxBtn">
          <a onClick={this.onSubmit.bind(this)} className="m2btn_a1" href="javascript:;">修 改</a>
        </div>
      </div>
    )
  }
}
