import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.SETTINGS} className="mTop_back"></Link>
          通知提醒
        </div>
        <div className="m2Set">
          <ul className="mPer_u2">
            <li>接受新消息通知 <div className="mSet_btn"><i /></div></li>
          </ul>
          <ul className="mPer_u2">
            <li>声音 <div className="mSet_btn on"><i /></div></li>
            <li>震动 <div className="mSet_btn on"><i /></div></li>
          </ul>
        </div>
      </div>
    )
  }
}
