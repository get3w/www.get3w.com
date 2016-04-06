import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  isOp: boolean
  user: models.User
  org: models.Org
  onClose: Function
  onMainChange: (mainType: string, lr: models.LearnRecord) => void
}

interface S {
  lrs: Array<models.LearnRecord>
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      lrs: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.user.userName)
  }

  componentDidMount() {
    this.load(this.props.user.userName)
  }

  load(userName: string) {
    client.learnRecoreds.list(userName, (err: models.Error, res: Array<models.LearnRecord>) => {
      this.state.lrs = res
      this.setState(this.state)
    })
  }

  onDeleteClick(lr: models.LearnRecord, e) {
    utils.Swal.confirm('删除党课学习记录', '此操作将删除党课学习记录，确认吗', (isConfrim: boolean) => {
      if (isConfrim) {
        client.learnRecoreds.delete(lr.id, (err: models.Error, res) => {
          if (!err){
            this.state.lrs.splice(this.state.lrs.indexOf(lr), 1)
            this.setState(this.state)
          }
        })
      }
    })
  }

  render() {
    const listEl = this.state.lrs.map((lr: models.LearnRecord) => {
      let viewEl = null
      let opEl = null
      if (this.props.isOp) {
        opEl = (
          <div className="center">
            <a onClick={this.props.onMainChange.bind(this, 'upload', lr) } href="javascript:;" className="m2fm_abtn">上传结业证书</a>
            <a onClick={this.props.onMainChange.bind(this, 'new', lr) } href="javascript:;" className="m2fm_abtn">编辑</a>
            <a onClick={this.onDeleteClick.bind(this, lr) } href="javascript:;" className="m2fm_abtn">删除</a>
          </div>
        )
      }
      return (
        <tr>
          <td className="center">{utils.Translate.toShortDate(lr.startTime)}</td>
          <td className="center">{utils.Translate.toShortDate(lr.endTime)}</td>
          <td className="center">{lr.place}</td>
          <td className="center">{lr.lectureName}</td>
          <td className="center">{lr.classHour}</td>
          <td className="center">{viewEl}</td>
          <td className="center">
            {opEl}
          </td>
        </tr>
      )
    })

    let addEl = null
    if (this.props.isOp) {
      addEl = (
        <div className="layer_btnBox1">
          <a onClick={this.props.onMainChange.bind(this, 'new', null) } href="javascript:;" className="m2fm_pubBtn2">新 增</a>
        </div>
      )
    }

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: "396px", width: "935px", marginLeft: "-467px", marginTop: "-196px" }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
        <div className="layer_t">党课学习记录</div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td>开始时间</td>
                <td>结束时间</td>
                <td>地 点</td>
                <td>课程名称</td>
                <td>课 时</td>
                <td>结业证书</td>
                <td>操 作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
        {addEl}
      </div>
    )
  }
}
