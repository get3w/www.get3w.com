import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  typeNames: Array<string>
  typeName: string
  metric: models.TestMetric
  onMain: (mainType: string, typeName: string) => void
  onClose: (isReload: boolean) => void
}

interface S {
  typeNames: Array<string>
  metric: models.TestMetric
  controls: { [index: string]: boolean }
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      typeNames: null,
      metric: props.metric || new models.TestMetric(),
      controls: {},
    }
  }

  componentWillReceiveProps(nextProps: P) {
    const metric = nextProps.metric || new models.TestMetric()
    if (nextProps.typeName) {
      metric.typeName = nextProps.typeName
    }
    this.setState({
      typeNames: nextProps.typeNames,
      metric: metric,
      controls: {},
    })
  }

  componentDidMount() {
    const metric = this.props.metric || new models.TestMetric()
    if (this.props.typeName) {
      metric.typeName = this.props.typeName
    }
    this.setState({
      typeNames: this.props.typeNames,
      metric: metric,
      controls: {},
    })
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state.metric[name] = e.target.value
    this.setState(this.state)
  }

  onValueChange(name: string, value: string, e) {
    this.state.metric[name] = value
    this.state.controls[name] = false
    this.setState(this.state);
  }

  onSubmit() {
    if (this.props.metric) {
      client.testMetrics.edit(this.state.metric, () => {
        this.props.onClose(true)
      })
    } else {
      client.testMetrics.create(this.state.metric, () => {
        this.props.onClose(true)
      })
    }
  }

  render() {
    const title = this.props.metric ? '新增指标' : '编辑指标'

    let typeNamesEl = []
    if (this.state.typeNames) {
      this.state.typeNames.map((typeName: string) => {
        typeNamesEl.push(<dd key={typeName} onClick={this.onValueChange.bind(this, "typeName", typeName) }>{typeName}</dd>)
      })
    }

    return (
      <div className="layerCon1" style={{ height: 590, width: 730, marginLeft: '-365px', marginTop: '-295px' }}>
        <i className="layerClose" onClick={this.props.onClose.bind(this) } />
        <div className="layer_t">{title}</div>
        <div className="m2nadBox">
          <ul>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>所属项目</span>
              <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                <input onClick={this.onClick.bind(this, "typeName") } value={this.state.metric.typeName} type="text" className="m2fm_int m2fm_int3" style={{ width: 400 }} />
                <div className="m2fm_selBox" style={{ position: "absolute", top: "50px", left: "0", display: this.state.controls["typeName"] ? "block" : "none ", width: "420px" }}>
                  <dl>
                    {typeNamesEl}
                  </dl>
                </div>
              </div>
              <a onClick={this.props.onMain.bind(this, 'xiangmu', '') } className="m2fm_pubBtn2" href="javascript:;">新增项目</a>
            </li>
            <li style={{ height: 'auto' }}>
              <span className="lay_s1" style={{ width: 72 }}>考核内容</span>
              <textarea value={this.state.metric.content} onChange={this.onChange.bind(this,"content")} className="m2fm_int m2fm_int10 fl" style={{ padding: '5px 10px', lineHeight: "20px", height: 80, width: 495 }} />
              <div className="clear" />
            </li>
            <li style={{ height: 'auto' }}>
              <span className="lay_s1" style={{ width: 72 }}>考核标准</span>
              <textarea value={this.state.metric.standard} onChange={this.onChange.bind(this,"standard")} className="m2fm_int m2fm_int10 fl" style={{ padding: '5px 10px', lineHeight: "20px", height: 80, width: 495 }} />
              <div className="clear" />
            </li>
            <li style={{ height: 'auto' }}>
              <span className="lay_s1" style={{ width: 72 }}>考核依据</span>
              <textarea value={this.state.metric.gist} onChange={this.onChange.bind(this,"gist")} className="m2fm_int m2fm_int10 fl" style={{ padding: '5px 10px', lineHeight: "20px", height: 80, width: 495 }} />
              <div className="clear" />
            </li>
            <li>
              <span className="lay_s1" style={{ width: 72 }}>分值</span>
              <input value={this.state.metric.defaultPoint ? this.state.metric.defaultPoint.toString() : '' } onChange={this.onChange.bind(this,"defaultPoint")} className="m2fm_int m2fm_int10" style={{ width: 495 }} type="text" />
            </li>
          </ul>
        </div>
        <div className="m2btnBox2" style={{ textAlign: 'center', paddingLeft: 0, paddingTop: 15 }}>
          <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onClose.bind(this) } href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>

    )
  }
}
