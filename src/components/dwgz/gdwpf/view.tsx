import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  onMain: (mainType: string) => void
  onClose: Function
}

export default class View extends React.Component<P, {}> {
  render() {
    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{ height: 446, width: 935, marginLeft: '-467px', marginTop: '-223px' }}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'list') }></i>
        <div className="layer_t">材料清单查看</div>
        <div className="layer_tab3" style={{ marginTop: 40, height: 267 }}>
          <table width="100%">
            <tbody><tr className="layer_th3">
              <td width="12%" className="center">序号</td>
              <td width="50%" className="left">材料名称</td>
              <td width="28%" className="center">材料类型</td>
              <td width="10%" className="center">操作</td>
            </tr>
              <tr>
                <td className="center">1</td>
                <td className="left">XXXX XXXX XXXX XXXX XXXX XXXX XXXX</td>
                <td className="center">XXXX XXXXX XXXXX</td>
                <td className="center"><a href="#" className="m2fm_abtn">删除</a></td>
              </tr>
              <tr>
                <td className="center">1</td>
                <td className="left">XXXX XXXX XXXX XXXX XXXX XXXX XXXX</td>
                <td className="center">XXXX XXXXX XXXXX</td>
                <td className="center"><a href="#" className="m2fm_abtn">删除</a></td>
              </tr>
              <tr>
                <td className="center">1</td>
                <td className="left">XXXX XXXX XXXX XXXX XXXX XXXX XXXX</td>
                <td className="center">XXXX XXXXX XXXXX</td>
                <td className="center"><a href="#" className="m2fm_abtn">删除</a></td>
              </tr>
              <tr>
                <td className="center">1</td>
                <td className="left">XXXX XXXX XXXX XXXX XXXX XXXX XXXX</td>
                <td className="center">XXXX XXXXX XXXXX</td>
                <td className="center"><a href="#" className="m2fm_abtn">删除</a></td>
              </tr>
            </tbody></table>
        </div>
      </div>
    )
  }
}
