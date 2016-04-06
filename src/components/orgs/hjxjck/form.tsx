import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  eh: models.ElectionHistory
  onClose: Function
}

export default class HJXJCK extends React.Component<P, {}> {
  render() {
    const eh = this.props.eh

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ width: 646, height: 510, marginLeft: '-323px', marginTop: '-255px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this)} />
          <div className="layer_t">{eh.title}</div>
          <div className="layer_fm2">
            <ul>
              <li>
                <strong className="layer_fm2b">当前组织：{eh.orgName}</strong>
              </li>
              <li>
                界数 : <span className="layer_corRed" style={{marginRight: "35px"}}>{eh.periodNum}界</span>
                任期年限 : <span className="layer_corRed" style={{marginRight: "35px"}}>{eh.serviceLife}年</span>
                换届时间 : <span className="layer_corRed" style={{marginRight: "35px"}}>{utils.Translate.toShortDate(eh.happenDate)}</span>
              </li>
              <li>
                关联会议 : <span className="layer_corRed" style={{marginRight: "35px"}}>{eh.meetingName}</span>
                选举形式 : <span className="layer_corRed">{eh.electionForms}</span>
              </li>
              <li>
                应到会人数 : <span className="layer_corRed" style={{marginRight: "35px"}}>{eh.mustAttendNum} 人</span>
                实到会人数 : <span className="layer_corRed">{eh.attendNum} 人</span>
              </li>
              <li>
                <span className="fl">选举情况 : </span>
                <div className="layer_fm2Txt" style={{ height: "168px", overflow: "scroll"}}>
                  <span className="layer_corRed">{eh.content}</span>
                </div>
                <div className="clear" />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingTop: 0, paddingLeft: 0, textAlign: 'center' }}>
            <a onClick={this.props.onClose.bind(this)} href="javascript:;" className="m2btn_a1">关 闭</a>
          </div>
        </div>
      </div>
    )
  }
}
