import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

interface S {
  isDetail: boolean
  isPaymentType: boolean
}

export default class IndexPage extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      isDetail: false,
      isPaymentType: false
    }
  }

  render() {
    let popupEl = null
    let paymentType = null
    if (this.state.isDetail) {
      popupEl = (
        <div>
                <div className="mLayerBg" />
                <div className="mPayLaer">
                    <i className="mPay_close">
                    </i>
                    <a href="partyToPay.html">
                        <div className="mPay_t1">缴费详情</div>
                    </a>
                    <ul className="mPay_pitms">
                    <li>
                    <a href="javascript:;">缴费方式：</a>
                    <a onClick={() => {
                      this.setState({
                        isDetail: false,
                        isPaymentType: true
                      })
                    }} href="javascript:;" className="mPay_md">支付宝</a>
                    </li>
                    <li>缴费金额：<span className="mPay_mn">45.5元</span>
                    </li>
                    </ul>
                    <Link to={links.INDEX} className="mBm_btn1">确认付款</Link>
                </div>
            </div>
      )
    } else if (this.state.isPaymentType) {
      popupEl = (
        <div>
        <div className="mLayerBg"></div>
        <div className="mPayLaer">
            <i className="mPay_close">
            </i>
            <div className="mPay_t1">选择付款方式</div>
            <ul className="mPay_pitms">
                <li>
                <img src="/assets/mobile/images/pay_icon1.png" />
                微信 <i>
                </i>
                </li>
                <li className="on">
                <a href="paymentDetail.html">
                <img src="/assets/mobile/images/pay_icon2.png" />
                支付宝
                <i></i>
                </a>
                </li>
                <li>
                <img src="/assets/mobile/images/pay_icon3.png" />
                和包 <i>
                </i>
                </li>
                <li>
                <img src="/assets/mobile/images/pay_icon4.png" />中国银行储蓄卡（网银）<i>
                </i>
                </li>
                <li className="mPay_other">
                <Link to={links.USER_ADD_CARD}>
                <img src="/assets/mobile/images/pay_icon5.png" />
                添加新卡
                <i className="mPer_arrow">
                </i>
                </Link>
                </li>
            </ul>
        </div>
        </div>
      )
    }

    return (
      <div>
                <div className="mTop">
                    <Link to={links.USER_DANGFEI} className="mTop_back">
                    </Link>
                    党费缴纳
                </div>
                <div className="m2jf_icon autoImg">
                <img src="/assets/mobile/images/jf_icon1.png" />
                </div>
                <div className="m2jf_stxt">本次待缴纳党费：<span className="cor_red">45.5元</span>
                </div>
                <a onClick={() => {
                  this.setState({
                    isDetail: true,
                    isPaymentType: false
                  })
                }} className="mBm_btn1" href="javascript:;">立即缴费</a>
                {popupEl}
            </div>

    )
  }
}
