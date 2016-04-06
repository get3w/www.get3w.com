import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
                <div className="mTop">
                    <Link to={links.YW_DANGFEI} className="mTop_back"></Link>
                    缴费记录
                </div>
                <ul className="mPer_u1">
                    <li><a href="busPartyPayRecord.html">
                            <div className="mPer_tm1">2016年3月</div>
                            <div className="mPer_u1bx1">
                                未缴：<span className="cor_red">56</span>元<br />
                                已结：12元（现金：5元，线上：7元）
                            </div>
                            <div className="mPer_u1bx2">
                                欠款名单：张立群  刘星
                            </div>
                        </a></li><a href="busPartyPayRecord.html">
                        <li>
                            <div className="mPer_tm1">2016年3月</div>
                            <div className="mPer_u1bx1">
                                已结清：56元<br />
                                现金：6元　　线上：50元
                            </div>
                        </li>
                        <li>
                            <div className="mPer_tm1">2016年3月</div>
                            <div className="mPer_u1bx1">
                                已结清：56元<br />
                                现金：6元　　线上：50元
                            </div>
                        </li>
                        <li>
                            <div className="mPer_tm1">2016年3月</div>
                            <div className="mPer_u1bx1">
                                已结清：56元<br />
                                现金：6元　　线上：50元
                            </div>
                        </li>
                    </a></ul><a href="busPartyPayRecord.html">
                </a></div>


    )
  }
}
