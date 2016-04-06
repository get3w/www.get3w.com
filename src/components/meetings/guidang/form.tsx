import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  meeting: models.Meeting
  onClose: Function
  onSuccess?: Function
}

interface S {
  meeting: models.Meeting
}

export default class GUIDANG extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meeting: this.props.meeting
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      meeting: nextProps.meeting
    })
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const meeting = this.state.meeting
    utils.DOM.loading(true)
    meeting.isArchive = true
    client.meetings.edit(meeting, (err, res) => {
      utils.DOM.loading(false)
      if (!err) {
        utils.Swal.success('归档成功', '', true, () => {
          this.props.onClose()
          this.props.onSuccess()
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    const meeting = this.state.meeting

    const title = '是否将' + meeting.meetingName + '归档'
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
