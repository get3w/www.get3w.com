import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  onClose: Function
}

export default class ZHUANCHU extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  render() {

    const title = '党组织信息统计'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3" style={{height: "550px"}}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2tabs" style={{margin: "10px"}}>
            <table width="100%">
              <tbody>
                <tr className="m2tabs_th">
                  <td className="m2tabs_ltd center" width="32%">名 称 </td>
                  <td width="22%" className="center">支部现有党员</td>
                  <td width="29%" className="center">上级党组织</td>
                  <td className="m2tabs_rtd center" width="17%">所属省市</td>
                </tr>
                <tr>
                  <td className="center m2tabs_ltd">XXXXXXXXXXXXXXXX</td>
                  <td className="center">3</td>
                  <td className="center">XXXXXXXXXXXXXXXX</td>
                  <td className="center m2tabs_rtd">河北</td>
                </tr>
                <tr>
                  <td className="center m2tabs_ltd">XXXXXXXXXXXXXXXX</td>
                  <td className="center">3</td>
                  <td className="center">XXXXXXXXXXXXXXXX</td>
                  <td className="center m2tabs_rtd">河北</td>
                </tr>
                <tr>
                  <td className="center m2tabs_ltd">XXXXXXXXXXXXXXXX</td>
                  <td className="center">3</td>
                  <td className="center">XXXXXXXXXXXXXXXX</td>
                  <td className="center m2tabs_rtd">河北</td>
                </tr>
                <tr>
                  <td className="center m2tabs_ltd">XXXXXXXXXXXXXXXX</td>
                  <td className="center">3</td>
                  <td className="center">XXXXXXXXXXXXXXXX</td>
                  <td className="center m2tabs_rtd">河北</td>
                </tr>
                <tr>
                  <td className="center m2tabs_ltd">XXXXXXXXXXXXXXXX</td>
                  <td className="center">3</td>
                  <td className="center">XXXXXXXXXXXXXXXX</td>
                  <td className="center m2tabs_rtd">河北</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
