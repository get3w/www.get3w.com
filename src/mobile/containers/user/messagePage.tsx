import * as React from 'react'
import { Link } from 'react-router';
import * as links from '../../constants/links';

interface S {
  messageID: number
}

export default class IndexPage extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      messageID: 0,
    }
  }

  onClick(id: number, e) {
    this.setState({
      messageID: id
    })
  }

  render() {
    if (this.state.messageID) {
      return (
        <div>
                <div className="mTop">
                    <a onClick={this.onClick.bind(this, 0)} href="javascript:;" className="mTop_back" />
                    消息通知
                </div>
                <div className="mMes_t">标题</div>
                <div className="mMes_info">
                &nbsp;&nbsp;
                <span id="mMes_Date">2016年3月3日</span>
                &nbsp;&nbsp;
                <span id="mMes_sUserName">莫言</span>
                </div>
                <div className="mMes_txt">
                 正文
                </div>
            </div>

      )
    }

    return (
      <div>
                <div className="mTop">
                    <Link to={links.INDEX} className="mTop_back"></Link>
                    消息通知
                </div>
                <ul className="m2u2">
                    <li className="clearfix">
                        <a onClick={this.onClick.bind(this, 1)} href="javascript:;">
                            <div className="m2u2_time">2016-03-17</div>
                            <strong>两会授权发布：政府工作报告</strong>
                            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志为总书记的党中央坚强领导下...</p>
                        </a>
                        </li>
                        <li className="clearfix">
                        <a onClick={this.onClick.bind(this, 1)} href="javascript:;">
                            <div className="m2u2_time">2016-03-17</div>
                            <strong>两会授权发布：政府工作报告</strong>
                            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志为总书记的党中央坚强领导下...</p>
                        </a>
                        </li>
                        <li className="clearfix">
                        <a onClick={this.onClick.bind(this, 1)} href="javascript:;">
                            <div className="m2u2_time">2016-03-17</div>
                            <strong>两会授权发布：政府工作报告</strong>
                            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志为总书记的党中央坚强领导下...</p>
                        </a>
                        </li>
                        <li className="clearfix">
                        <a onClick={this.onClick.bind(this, 1)} href="javascript:;">
                            <div className="m2u2_time">2016-03-17</div>
                            <strong>两会授权发布：政府工作报告</strong>
                            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志为总书记的党中央坚强领导下...</p>
                        </a>
                        </li>
                        </ul>
                </div>

    )
  }
}
