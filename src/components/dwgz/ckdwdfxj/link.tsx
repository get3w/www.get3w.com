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

export default class Link extends React.Component<P, {}> {
  render() {
    return (
      <div className="layerCon1 layerCon3 layerCon3b" style={{height:"576px", marginTop:"-288px", position:"fixed", width:"646px", marginLeft:"-323px"}}>
        <i className="layerClose" onClick={this.props.onMain.bind(this, 'list') }></i>
        <div className="layer_t">材料清单</div>
        <div className="lay_sbx" style={{ border: 'none' }}>
          考核内容：XXXXXXXXXXXXXXXXXX<br />
          考核依据：
        </div>
        <div className="lay_sbx4">1、查阅有关资料（会议记录、讲话稿、规章制度等）；<br />2、通过个别谈询了解。</div>
        <div className="lay_sbx" style={{ border: 'none' }}>
          上传考核依据材料<br />
          <span style={{ display: 'inline-block', paddingLeft: 23 }}>选择系统内材料：</span>
        </div>
        <div className="m2nadBox m2per_boxUl m2nadBox2" style={{ paddingTop: 0 }}>
          <ul>
            <li>
              <span className="lay_s1">会议类型</span>
              <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left', marginRight: 6 }}>
                <input type="text" className="m2fm_int m2fm_int3" placeholder="全部" style={{ width: 126 }} />
                <div className="m2fm_selBox" style={{ width: 146 }}>
                  <dl>
                    <dd>北京</dd>
                    <dd>河北</dd>
                  </dl>
                </div>
              </div>
              <span className="lay_s1">会议名称</span>
              <input type="text" className="m2fm_int" style={{ float: 'left', marginRight: 10, width: 220 }} />
            </li>
            <li>
              <span className="lay_s1">会议时间</span>
              <input type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 156 }} />
              <span className="lay_s1">至</span>
              <input type="text" className="m2fm_int m2fm_int2" style={{ float: 'left', marginRight: 10, width: 156 }} />
              <a href="javascript:;" className="m2fm_pubBtn1">搜 索 </a>
            </li>
          </ul>
        </div>
        <div className="lay_sbx" style={{ border: 'none', paddingTop: 0, height: 40 }}>
          <span style={{ display: 'inline-block', paddingLeft: 23, float: 'left', marginRight: 10, lineHeight: 36 }}>选择系统外材料：</span>
          <a className="lay_upload fl" style={{ width: 90 }} href="#">上传材料</a>
        </div>
        <div className="m2btnBox2" style={{ paddingTop: 35, paddingLeft: 0, textAlign: 'center' }}>
          <a href="javascript:;" className="m2btn_a1">确 定</a>
          <a href="javascript:;" className="m2btn_a2">取 消</a>
        </div>
      </div>
    )
  }
}
