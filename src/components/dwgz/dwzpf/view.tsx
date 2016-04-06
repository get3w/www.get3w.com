import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as Upload from 'rc-upload'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  resultID: number
  user: models.User
  isUpload: boolean
  onMain: (mainType: string, result: models.TestExamResult) => void
  onClose: Function
}

interface S {
  result: models.TestExamResult
  meetings: Array<models.Meeting>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      meetings: null
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.resultID)
  }

  componentDidMount() {
    this.load(this.props.resultID)
  }

  load(resultID: number) {
    if (!this.state.result) {
      client.testExamResults.get(resultID, (err: models.Error, result: models.TestExamResult) => {
        if (result.meetingIDs) {
          client.meetings.searchByIDs(result.meetingIDs, (err: models.Error, res: Array<models.Meeting>) => {
            this.setState({
              result: result,
              meetings: res
            })
          })
        } else {
          this.setState({
            result: result,
            meetings: []
          })
        }
      })
    } else {
      const result = this.state.result
      if (result.meetingIDs) {
        client.meetings.searchByIDs(result.meetingIDs, (err: models.Error, res: Array<models.Meeting>) => {
          this.setState({
            result: result,
            meetings: res
          })
        })
      } else {
        this.setState({
          result: result,
          meetings: []
        })
      }
    }
  }

  render() {
    if (!this.state.meetings) return <InnerLoading />

    let cmdEl = null

    let i = 0
    let listEl = this.state.meetings.map((meeting: models.Meeting) => {
      let deleteEl = null
      if (this.props.isUpload) {
        deleteEl = <a onClick={() => {
          let arr = this.state.result.meetingIDs.split(',')
          arr.splice(arr.indexOf(meeting.id + ''), 1)
          this.state.result.meetingIDs = arr.join(',')
          utils.DOM.loading(true)
          client.testExamResults.edit(this.state.result, () => {
            utils.DOM.loading(false)
            this.load(this.props.resultID)
          })
        }} href="javascript:;" className="m2fm_abtn">删除</a>
      }
      return (
        <tr key={i++}>
          <td className="center">{i}</td>
          <td className="left">{meeting.meetingName}</td>
          <td className="center">关联会议</td>
          <td className="center">
            {deleteEl}
          </td>
        </tr>
      )
    })
    if (this.state.result.fileUrls) {
      this.state.result.fileUrls.split(',').forEach((fileUrl: string) => {
        let deleteEl = null
        if (this.props.isUpload) {
          deleteEl = <a onClick={() => {
            let arr = this.state.result.fileUrls.split(',')
            arr.splice(arr.indexOf(fileUrl), 1)
            this.state.result.fileUrls = arr.join(',')
            utils.DOM.loading(true)
            client.testExamResults.edit(this.state.result, () => {
              utils.DOM.loading(false)
              this.load(this.props.resultID)
            })
          }} href="javascript:;" className="m2fm_abtn">删除</a>
        }
        listEl.push(
          <tr key={i++}>
            <td className="center">{i}</td>
            <td className="left"></td>
            <td className="center">上传材料</td>
            <td className="center">
              {deleteEl}
            </td>
          </tr>
        )
      })
    }

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 446, width: 935, marginLeft: '-467px', marginTop: '-223px' }}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'list') }></i>
        <div className="layer_t">{this.props.isUpload ? '材料清单上传' : '材料清单查看'}</div>
        <div className="layer_tab3" style={{ marginTop: 10, height: 267 }}>
          <table width="100%">
            <tbody>
              {cmdEl}
              <tr className="layer_th3">
                <td className="center">序号</td>
                <td className="left">材料名称</td>
                <td className="center">材料类型</td>
                <td className="center">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
        <div className="m2fm_sbxBtn" style={{ paddingTop: 30 }}>
          <a onClick={this.props.onMain.bind(this, 'list', null)} href="javascript:;" className="m2btn_a2">关 闭</a>
        </div>
      </div>
    )
  }
}
