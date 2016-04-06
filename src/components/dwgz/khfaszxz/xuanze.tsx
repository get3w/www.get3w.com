import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  solution: models.TestSolution
  onMain: (mainType: string, solution: models.TestSolution, metricIDs: Array<number>) => void
  onClose: Function
}

interface S {
  typeName: string
  content: string
  metrics: Array<models.TestMetric>
  metricIDs: Array<number>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      typeName: null,
      content: null,
      metrics: null,
      metricIDs: []
    }
  }

  onChange(name: string, value: string, e) {
    this.state[name] = value
    this.setState(this.state);
  }

  onCheck(metricID: number, e) {
    if (metricID === 0) {
      this.state.metricIDs = this.state.metrics.map((metric: models.TestMetric) => {
        return metric.id
      })
    } else {
      if (this.state.metricIDs.indexOf(metricID) === -1) {
        this.state.metricIDs.push(metricID)
      } else {
        this.state.metricIDs.splice(this.state.metricIDs.indexOf(metricID), 1)
      }
    }
    this.setState(this.state);
  }

  onSearch() {
    client.testMetrics.search(this.state.typeName, this.state.content, (err: models.Error, res: Array<models.TestMetric>) => {
      this.state.metrics = res
      this.setState(this.state)
    })
  }

  render() {
    let listEl = null
    if (this.state.metrics) {
      listEl = this.state.metrics.map((metric: models.TestMetric) => {
        return (
          <tr key={metric.id}>
            <td className="center">
              <input onChange={this.onCheck.bind(this, metric.id)} checked={this.state.metricIDs.indexOf(metric.id) !== -1} type="checkbox" className="lay-rad" />
            </td>
            <td className="left">
              <span className="cor_red">{metric.content}</span>
            </td>
            <td className="center">{metric.typeName}</td>
            <td className="center">{metric.standard}</td>
            <td className="center">{metric.gist}</td>
            <td className="center">{metric.defaultPoint}</td>
          </tr>
        )
      })
    }

    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 440, width: 935, marginLeft: '-467px', marginTop: '-220px' }}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'xinzeng')} />
        <div className="layer_t">选择考核指标</div>
        <div className="m2nadBox m2per_boxUl m2nadBox2" style={{ paddingTop: 30 }}>
          <ul>
            <li>
              <span className="lay_s1">项 目</span>
              <input onChange={this.onChange.bind(this, "typeName") } value={this.state.typeName} type="text" className="m2fm_int" style={{ width: 188, float: 'left', marginRight: 10, border: '1px solid #F8EBC8' }} />
              <span className="lay_s1">考核内容</span>
              <input onChange={this.onChange.bind(this, "content") } value={this.state.content} type="text" className="m2fm_int" style={{ width: 428, float: 'left', marginRight: 10 }} />
              <a onClick={this.onSearch.bind(this)} className="m2fm_pubBtn1" href="javascript:;">搜 索</a>
            </li>
          </ul>
        </div>
        <div className="layer_tab3">
          <table width="100%">
            <tbody>
              <tr className="layer_th3">
                <td width="7%" className="center">
                  <input onChange={this.onCheck.bind(this, 0)} type="checkbox" className="lay-rad" />
                </td>
                <td width="26%" className="left">考核内容</td>
                <td width="17%" className="center">项目</td>
                <td width="17%" className="center">考核标准</td>
                <td width="8%" className="center">考核依据</td>
                <td width="8%" className="center">分值</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
        <div className="m2fm_sbxBtn" style={{ paddingTop: 30 }}>
          <a onClick={this.props.onMain.bind(this, 'xinzeng', this.props.solution, this.state.metricIDs)} href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onMain.bind(this, 'xinzeng', this.props.solution, null)} href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>

    )
  }
}
