import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.YW} className="mTop_back"></Link>
          党费缴纳
        </div>
        <ul className="mPer_u2">
          <li>
            <Link to={links.YW_JIAONA}>缴纳党费 <i className="mPer_arrow" /></Link>
          </li>
          <li>
            <Link to={links.YW_JILU_LIST}>缴纳记录 <i className="mPer_arrow" /></Link>
          </li>
        </ul>
      </div>
    )
  }
}
