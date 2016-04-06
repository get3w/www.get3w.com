import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as links from '../../constants/links';

interface P {
  title: string
  onClose: Function
  onSubmit: Function
}

export default class Confirm extends React.Component<P, {}> {
  // onSubmit(e: React.MouseEvent) {
  //   utils.DOM.prevent(e)
  //
  //   const user = this.state.user
  //   if (user.userName) {
  //     utils.DOM.loading(true)
  //     if (this.props.user) {
  //       user.orgID = 0
  //       client.users.edit(user.userName, user, (err, res) => {
  //         utils.DOM.loading(false)
  //         if (!err) {
  //           utils.Logic.addRecord(user, this.props.org, user.userType, false, () =>{
  //             utils.Swal.success('转出成功', '', true, () => {
  //               this.props.onClose()
  //               this.props.onSuccess()
  //             })
  //           }, null, new Date())
  //         } else {
  //           utils.Swal.error(err)
  //         }
  //       })
  //     }
  //   }
  // }

  render() {
    const title = this.props.title
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.props.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
