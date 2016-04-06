import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import {InnerLoading} from '../../../lib/components'
import * as links from '../../../constants/links';

interface P {
  exam: models.TestExam
  onMain: (mainType: string) => void
  onClose: Function
}

interface S {
  results: Array<models.TestExamResult>
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.exam)
  }

  componentDidMount() {
    this.load(this.props.exam)
  }

  load(exam: models.TestExam) {
    utils.DOM.loading(true)
    client.testExamResults.list(exam.taskID, exam.id, exam.solutionID, (err: models.Error, res: Array<models.TestExamResult>) => {
      utils.DOM.loading(false)
      this.state.results = res
      this.setState(this.state)
    })
  }

  render() {
    if (!this.state.results) return <InnerLoading />

    const listEl = this.state.results.map((result: models.TestExamResult) => {
      return (
        <tr key={result.id}>
          <td className="center">{result.content}</td>
          <td className="center">{result.typeName}</td>
          <td className="center">{result.point}</td>
          <td className="center">{result.gist}</td>
          <td className="center">
            <a onClick={this.props.onMain.bind(this, 'view')} className="cor_red" href="javascript:;">查看</a>
          </td>
          <td className="center">
            { result.selfPoint ? result.selfPoint.toString() : '0' }
          </td>
          <td className="center">
            { result.upPoint ? result.upPoint.toString() : '0' }
          </td>
          <td className="center"></td>
        </tr>
      )
    })

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 446, width: 935, marginLeft: '-467px', marginTop: '-223px' }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
        <div className="layer_t">查看党委得分细节</div>
        <div className="m2lay_tbx">
          <table className="m2fm_stb1" width="100%">
            <tbody>
              <tr>
                <td width="70%">组织名称：{this.props.exam.orgName}</td>
                <td width="30%">考核时间：{utils.Translate.toShortDate(this.props.exam.startTime) + ' 至 ' + utils.Translate.toShortDate(this.props.exam.endTime)}</td>
              </tr>
              <tr>
                <td>考核方案：{this.props.exam.solutionName}</td>
                <td>&nbsp; </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="layer_tab3">
          <table width="100%">
            <tbody>
              <tr className="layer_th3">
                <td className="center">考核内容</td>
                <td className="center">项目</td>
                <td className="center">分值</td>
                <td className="center">评分标准</td>
                <td className="center">材料清单</td>
                <td className="center">自评分</td>
                <td className="center">考核分</td>
                <td className="center">综合分</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
