import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  onMain: (mainType: string, typeName: string) => void
  onClose: Function
}

interface S {
  typeName: string
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      typeName: '',
    }
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state)
  }

  onSubmit() {
    this.props.onMain('zhibiao', this.state.typeName)
  }

  render() {
    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 320, marginTop: '-160px' }}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'zhibiao', '') } />
        <div className="layer_t">新增项目</div>
        <div className="m2fmUnm" style={{ paddingTop: 50, height: 120 }}>
          <span className="m2fm_s1">项目名称</span>
          <input value={this.state.typeName} onChange={this.onChange.bind(this,"typeName")} type="text" className="m2fm_int" style={{ width: 240 }} />
        </div>
        <div className="m2btnBox2 m2btnBox2a" style={{ paddingTop: 0 }}>
          <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">确 定</a>
          <a onClick={this.props.onMain.bind(this, 'zhibiao', '') } href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
