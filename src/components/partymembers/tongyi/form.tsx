import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  ot: models.OrgTransfer
  onClose: Function
}

export default class TONGYI extends React.Component<P, {}> {
  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)

    const ot = this.props.ot
    let orgType = this.props.org.orgType
    if (orgType === '地方党委' || orgType === '直属党委') {
      orgType = '党委'
    }
    ot.applyState = orgType + "审核通过"
    if (ot.transferType === '内部调动' || ot.transferType === '离职转出') {
      if (orgType === '党委') {
        ot.applyState = "转接完成"
      }
    } else { //移动集团内部转接
      if (this.props.org.id === ot.targetOrgID) {
        ot.applyState = "转接完成"
      }
    }

    client.orgTransfers.edit(ot, (err, res) => {
      utils.DOM.loading(false)
      if (!err) {
        this.props.onClose()
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    const title = '是否同意' + this.props.ot.displayName + '转出'
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
