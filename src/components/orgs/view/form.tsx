import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  parentOrg: models.Org
  onClose: Function
}

export default class Form extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3a">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">查看党组织</div>
          <div className="m2nadBox">
            <ul>
              <li>
                <span className="lay_s1">上级组织名称</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.parentOrg.orgName}</span>
              </li>
              <li>
                <span className="lay_s1">上级组织代码</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.parentOrg.code}</span>
              </li>
              <li>
                <span className="lay_s1">组织名称</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.org.orgName}</span>
              </li>
              <li>
                <span className="lay_s1">组织类型</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.org.orgType}</span>
              </li>
              <li>
                <span className="lay_s1">建立日期</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.org.createDate}</span>
              </li>
              <li>
                <span className="lay_s1">联系电话</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.org.tel}</span>
              </li>
              <li>
                <span className="lay_s1">通讯地址</span>
                <span className="lay_s1a" style={{paddingLeft: 0}}>{this.props.org.address}</span>
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>关 闭</a>
          </div>
        </div>
      </div>
    )
  }
}
