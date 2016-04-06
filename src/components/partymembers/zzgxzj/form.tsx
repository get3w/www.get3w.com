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

export default class ZZGXZJ extends React.Component<P, S> {
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

    const title = '组织关系转接'
    return (
      <div>
        <div className="layerBg"></div>

        <div className="layerCon1" style={{ width: 518, height: 520, marginLeft: '-259px', marginTop: '-260px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: 30 }}>
            <ul>
              <li>
                <span className="lay_s1">转接类型</span>
                <div className="m2fm_selContent" style={{ position: 'relative', float: 'left', paddingRight: 1 }}>
                  <input type="text" className="m2fm_int m2fm_int3" placeholder="跨省" />
                  <div className="m2fm_selBox">
                    <dl>
                      <dd>党员</dd>
                      <dd>非党员</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="lay_s1">党费交费时间</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" />
              </li>
              <li>
                <span className="lay_s1">原党支部</span>
                <span className="cor_666">XXXXXXX支部</span>
              </li>
              <li>
                <span className="lay_s1">目标组织</span>
                <input type="text" className="m2fm_int m2fm_int10" />
              </li>
              <li>
                <span className="lay_s1">是否同意</span>
                <span className="cor_666">
                  <input className="lay-rad" type="radio" />
                  &nbsp;同意 &nbsp;&nbsp;&nbsp;
                  <input className="lay-rad" type="radio" />
                  &nbsp;不同意
                </span>
              </li>
              <li style={{ height: 'auto' }}>
                <span className="lay_s1">备注</span>
                <textarea className="m2fm_int m2fm_int10" style={{ height: 60, lineHeight: 20, paddingTop: 5, paddingBottom: 5 }} />
                <div className="clear" />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingTop: 0 }}>
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>

      </div>
    )
  }
}
