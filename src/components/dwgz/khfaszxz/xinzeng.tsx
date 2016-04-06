import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import {InnerLoading} from '../../../lib/components'
import * as constants from '../../../constants'

interface P {
  user: models.User
  onMain: (mainType: string, solution: models.TestSolution) => void
  onClose: (isReload: boolean) => void
  solution: models.TestSolution
  metricIDs: Array<number>
}

interface S {
  solution: models.TestSolution
  tsms: Array<models.TestSolutionMetric>
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      solution: props.solution,
      tsms: null
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.metricIDs)
  }

  componentDidMount() {
    this.load(this.props.metricIDs)
  }

  load(metricIDs: Array<number>) {
    console.log(metricIDs)
    client.testSolutionMetrics.list(this.state.solution.id || 0, metricIDs, (err: models.Error, res: Array<models.TestSolutionMetric>) => {
      this.state.tsms = res
      this.setState(this.state)
    })
  }

  onChange(name: string, e) {
    this.state.solution[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit() {
    if (this.props.solution.id > 0) {
      client.testSolutions.edit(this.state.solution, () => {
        this.saveTestSolutionMetrics(this.props.solution.id)
        this.props.onClose(true)
      })
    } else {
      this.state.solution.addUserName = this.props.user.userName
      this.state.solution.addDisplayName = this.props.user.displayName
      client.testSolutions.create(this.state.solution, (err: models.Error, res: models.TestSolution) => {
        this.saveTestSolutionMetrics(res.id)
        this.props.onClose(true)
      })
    }
  }

  saveTestSolutionMetrics(solutionID: number) {
    if (this.state.tsms && this.state.tsms.length) {
      this.state.tsms.forEach((tsm: models.TestSolutionMetric) => {
        tsm.solutionID = solutionID
        client.testSolutionMetrics.create(tsm)
      })
    }
  }

  render() {
    if (!this.state.tsms) return <InnerLoading />

    let i = 1
    const listEl = this.state.tsms.map((tsm: models.TestSolutionMetric) => {
      return (
        <tr key={i++}>
          <td className="center">{i++}</td>
          <td className="center">
            {tsm.content}
          </td>
          <td className="center">{tsm.typeName}</td>
          <td className="center">{tsm.standard}</td>
          <td className="center">{tsm.gist}</td>
          <td className="center">
            <input onChange={(e) => {
              tsm.point = e.target['value']
              this.setState(this.state)
            }} value={tsm.point ? tsm.point.toString() : ''} className="mlayer_int1" type="text" />
          </td>
          <td className="center">
            <input onChange={(e) => {
              tsm.taxis = e.target['value']
              this.setState(this.state)
            }} value={tsm.taxis ? tsm.taxis.toString() : ''} className="mlayer_int1" type="text" />
          </td>
          <td className="center">
            <a onClick={ () => {
              this.state.tsms.splice(this.state.tsms.indexOf(tsm), 1)
              this.setState(this.state)
            }} href="javascript:;" className="m2fm_abtn">删除</a>
          </td>
        </tr>
      )
    })

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 484, width: 935, marginLeft: '-467px', marginTop: '-242px' }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) } />
        <div className="layer_t">考核方案设置</div>
        <div className="m2nadBox m2per_boxUl m2nadBox2" style={{ paddingTop: 30 }}>
          <ul>
            <li>
              <span className="lay_s1">方案名称</span>
              <input onChange={this.onChange.bind(this, "solutionName") } value={this.state.solution.solutionName} type="text" className="m2fm_int" style={{ width: 450 }} />
            </li>
            <li>
              <span className="lay_s1">方案描述</span>
              <input onChange={this.onChange.bind(this, "summary") } value={this.state.solution.summary} type="text" className="m2fm_int" style={{ width: 693, float: 'left', marginRight: 10 }} />
              <a onClick={this.props.onMain.bind(this, 'xuanze', this.state.solution) } className="m2fm_pubBtn2" href="javascript:;">新 增</a>
            </li>
          </ul>
        </div>
        <div className="layer_tab3">
          <table width="100%">
            <tbody>
              <tr className="layer_th3">
                <td className="center">序号</td>
                <td className="center">考核内容</td>
                <td className="center">项目</td>
                <td className="center">考核标准</td>
                <td className="center">考核依据</td>
                <td className="center">分值</td>
                <td className="center">排序</td>
                <td className="center">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
        <div className="m2fm_sbxBtn" style={{ paddingTop: 30 }}>
          <a onClick={this.onSubmit.bind(this)} href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onClose.bind(this, false) } href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
