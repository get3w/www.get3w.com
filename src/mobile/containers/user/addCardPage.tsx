import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
                <div className="mTop">
                    <Link to={links.USER_JIAONA} className="mTop_back"></Link>
                    添加银行卡
                </div>
                <ul className="lgFm m2jf_u1">
                    <li><img src="/assets/mobile/images/lg_icon5.png" />
                    <input type="text" className="lgFm_int" placeholder="请输入银行卡号" />
                    </li>
                </ul>
                <div className="m2jf_s2">党建智能加密，保障您的用卡安全</div>
                <Link to={links.USER_ADD_CARD_DETAIL} className="mBm_btn1">下一步</Link>
            </div>

    )
  }
}
