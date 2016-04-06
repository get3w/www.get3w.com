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
  onClose: Function
  onSuccess: Function
}

interface S {
  user: models.User
}

export default class ZHUANCHU extends React.Component<P, S> {
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
      if (this.props.user) {
        user.orgID = 0
        
      }
    }
  }

  render() {
    const user = this.state.user

    const title = '是否将' + user.displayName + '从本组织转出'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
