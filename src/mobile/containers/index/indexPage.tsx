import * as React from 'react'
import { Link } from 'react-router'
import * as links from '../../constants/links';
import Nav from '../../components/index/nav';
import User from '../../components/index/user';

interface S {
  isNav: boolean
  isUser: boolean
}

export default class IndexPage extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      isNav: false,
      isUser: false,
    }
  }

  onNavChange(isNav: boolean) {
    this.setState({
      isNav: isNav,
      isUser: this.state.isUser
    })
  }

  onUserChange(isUser: boolean) {
    this.setState({
      isNav: this.state.isNav,
      isUser: isUser,
    })
  }

  render() {
    let navEl = null
    if (this.state.isNav) {
      navEl = <Nav onNavChange={this.onNavChange.bind(this)} />
    }

    let userEl = null
    if (this.state.isUser) {
      userEl = <User onUserChange={this.onUserChange.bind(this)} />
    }

    return (
      <div>
        <div className="mTop">
          <a onClick={this.onUserChange.bind(this, true) } href="javascript:;" className="mTop_perIcon" />
          中国移动网上党校
          <a href="#" className="mTop_serIcon" />
          <a onClick={this.onNavChange.bind(this, true) } href="javascript:;" className="mTop_moreIcon" />
        </div>
        <div className="mNav">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide"><a className="mNav_a mNav_cuta" href="#">时政要闻</a></div>
              <div className="swiper-slide"><a className="mNav_a" href="#">集团信息</a></div>
              <div className="swiper-slide"><a className="mNav_a" href="#">基层动态</a></div>
              <div className="swiper-slide"><a className="mNav_a" href="#">专题专栏</a></div>
              <div className="swiper-slide"><a className="mNav_a" href="#">十三五会议</a></div>
            </div>
          </div>
        </div>
        <div className="mkFocus autoImg">
          <div className="swiper-container mkTopFocus">
            <div className="swiper-wrapper">
              <div className="swiper-slide"><Link to={links.CONTENT_}><img src="/assets/mobile/images/mban1.jpg" /><div className="mBanText">数读“习近平”这一年</div></Link></div>
              <div className="swiper-slide"><Link to={links.CONTENT_}><img src="/assets/mobile/images/mban1.jpg" /><div className="mBanText">数读“习近平”这一年</div></Link></div>
              <div className="swiper-slide"><Link to={links.CONTENT_}><img src="/assets/mobile/images/mban1.jpg" /><div className="mBanText">数读“习近平”这一年</div></Link></div>
              <div className="swiper-slide"><Link to={links.CONTENT_}><img src="/assets/mobile/images/mban1.jpg" /><div className="mBanText">数读“习近平”这一年</div></Link></div>
              <div className="swiper-slide"><Link to={links.CONTENT_}><img src="/assets/mobile/images/mban1.jpg" /><div className="mBanText">数读“习近平”这一年</div></Link></div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
        <ul className="hm_ul imgBlock clearfix">
          <li className="clearfix">
            <Link to={links.CONTENT_} href="javascript:;" className="fl"><img src="/assets/mobile/images/hm_img1.jpg" /></Link>
            <div className="hm_ulTxt">
              <strong><Link to={links.CONTENT_} href="javascript:;">日韩媒体关注李克强记者会 亲切“围棋迷”总理</Link></strong>
              <span className="hm_ulTime">2016-03-17</span>
            </div>
          </li>
          <li className="clearfix">
            <Link to={links.CONTENT_} href="javascript:;" className="fl"><img src="/assets/mobile/images/hm_img2.jpg" /></Link>
            <div className="hm_ulTxt">
              <strong><Link to={links.CONTENT_}>习近平：控制办奥成本 不搞铺张奢华</Link></strong>
              <span className="hm_ulTime">2016-03-17</span>
            </div>
          </li>
          <li className="hm_liNoImg">
            <strong><Link to={links.CONTENT_}>习近平：控制办奥成本 不搞铺张奢华</Link></strong>
            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志...</p>
            <span className="hm_ulTime">2016-03-17</span>
          </li>
          <li className="hm_liNoImg">
            <strong><Link to={links.CONTENT_}>习近平：控制办奥成本 不搞铺张奢华</Link></strong>
            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志...</p>
            <span className="hm_ulTime">2016-03-17</span>
          </li>
          <li className="clearfix">
            <Link to={links.CONTENT_} className="fl"><img src="/assets/mobile/images/hm_img1.jpg" /></Link>
            <div className="hm_ulTxt">
              <strong><Link to={links.CONTENT_}>习近平：控制办奥成本 不搞铺张奢华</Link></strong>
              <span className="hm_ulTime">2016-03-17</span>
            </div>
          </li>
          <li className="hm_liNoImg">
            <strong><Link to={links.CONTENT_}>习近平：控制办奥成本 不搞铺张奢华</Link></strong>
            <p>过去一年，我国发展面临多重困难和严峻挑战。在以习近平同志...</p>
            <span className="hm_ulTime">2016-03-17</span>
          </li>
        </ul>
        {navEl}
        {userEl}
      </div>
    )
  }
}
