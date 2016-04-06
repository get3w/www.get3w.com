import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.SETTINGS} className="mTop_back"></Link>
          意见反馈
        </div>
        <div className="m2fmBox">
          <textarea className="m2fm_area" placeholder="欢迎您提出宝贵意见" name="opinion" id="opinion" />
          <input className="m2fm_int" placeholder="请输入您的手机号码" name="mobile" id="mobile" type="text" />
        </div>
        <div className="m2stxt2">
          您也可以通过以下联系方式联系我们<br />
          邮箱：test@test.com
        </div>
        <a className="mBm_btn1" href="javacript:;">提交</a>
      </div>
    )
  }
}
