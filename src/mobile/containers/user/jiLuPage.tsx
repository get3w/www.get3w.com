import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.USER_DANGFEI} className="mTop_back"></Link>
          缴费记录
        </div>
        <div className="m2jf_t1">本次党费缴纳情况（截至时间12月12日）</div>
        <div className="m2jf_tab m2jf_tab2">
          <table width="100%">
            <tbody><tr className="m2jf_th">
              <td width="21%" className="center"><div className="m2jf_td1">金额</div></td>
              <td width="24%" className="center"><div>缴纳方式</div></td>
              <td width="25%" className="center"><div className="m2jf_td2">时间</div></td>
            </tr>
              <tr className="m2jf_tr">
                <td className="center">20.5</td>
                <td className="center">线上</td>
                <td className="center">2015/12/19</td>
              </tr>
              <tr className="m2jf_tr">
                <td className="center">20.5</td>
                <td className="center">线上</td>
                <td className="center">2015/12/19</td>
              </tr>
              <tr className="m2jf_tr">
                <td className="center">20.5</td>
                <td className="center">线上</td>
                <td className="center">2015/12/19</td>
              </tr>
              <tr className="m2jf_tr">
                <td className="center">20.5</td>
                <td className="center">线上</td>
                <td className="center">2015/12/19</td>
              </tr>
            </tbody></table>
        </div>
      </div>

    )
  }
}
