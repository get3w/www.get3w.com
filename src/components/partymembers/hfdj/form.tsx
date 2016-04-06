import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  onClose: Function
}

interface S {
  user: models.User
}

export default class HFDJ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      user: nextProps.user
    })
  }

  onChange(name: string, e) {
    const user = this.state.user
    user[name] = e.target.value
    this.setState({ user: user });
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const user = this.state.user
    if (user.userName) {
      utils.DOM.loading(true)
      
    }
  }

  render() {
    const user = this.state.user

    const title = '恢复党籍'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox">
            <ul>
              <li>
                <span className="lay_s1">恢复时间</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" name="" />
              </li>
              <li  style={{height: "70px"}}>
                <span className="lay_s1">备注</span>
                <textarea className="m2fm_int m2fm_int10" style={{height: "70px"}}></textarea>
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
