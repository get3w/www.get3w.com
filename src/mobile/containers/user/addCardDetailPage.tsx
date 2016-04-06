import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
                <div className="mTop">
                    <Link to={links.USER_ADD_CARD} className="mTop_back"></Link>
                    填写银行卡信息
                </div>
                <div className="m2jf_s2 m2jf_s2a">党建智能加密，保障您的用卡安全</div>
                <ul className="m2jf_u2">
                    <li><span className="m2jf_snm">卡类型</span>浦发银行储蓄卡</li>
                    <li><span className="m2jf_snm">姓名</span><div className="m2jf_intBox"><input className="m2jf_int" placeholder="欧阳娜娜" type="text" /></div></li>
                    <li><span className="m2jf_snm">证件号</span><div className="m2jf_intBox"><input className="m2jf_int" placeholder="130************831" type="text" /></div></li>
                    <li><span className="m2jf_snm">手机号</span><div className="m2jf_intBox"><input className="m2jf_int" placeholder="157****6600" type="text" /></div></li>
                </ul>
                <Link to={links.INDEX} className="mBm_btn1">确认</Link>
            </div>

    )
  }
}
