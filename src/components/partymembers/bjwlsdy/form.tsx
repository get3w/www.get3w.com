import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  flowUser: models.FlowUser
  onClose: Function
}

export default class BJWLSDY extends React.Component<P, {}> {
  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    utils.DOM.loading(true)
    this.props.flowUser.isCurrent = false
    client.flowUsers.edit(this.props.flowUser, (err, res) => {
      utils.DOM.loading(false)
      if (!err) {
        this.props.onClose()
        browserHistory.push(links.PARTY_MEMBERS_LD)
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    const title = '标记' + this.props.flowUser.name + '为历史党员'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1">
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
