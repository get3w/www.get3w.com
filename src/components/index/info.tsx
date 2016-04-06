import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Info extends React.Component<{}, {}> {
  render() {
    return (
      <div className="mcon1">
        <div className="mc1L">
          <div className="mc1_t">组织领导</div>
          <div className="bd">
            <ul>
              <li>
                <div className="mc1_pImg"><img src="/assets/images/per_img.jpg" width="117" height="146" /></div>
                <div className="mc1_ptxt">总支委员：尹秀忠<br />职    责  ：主持党委全面工作</div>
                <div className="mc1_plink">
                  <a href="#" className="mc1_a1">领导活动</a>
                  <a href="#" className="mc1_a1">领导讲话</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="hd">
            <ul>
              <li className="on">尹秀忠</li>
              <li>李修平</li>
              <li>张强</li>
              <li>王树义</li>
              <li>刘大伟</li>
              <li>钱理群</li>
              <li>张劲松</li>
            </ul>
          </div>
        </div>
        <div className="mc1M">
          <div className="mc2_t">组织动态</div>
          <div className="mc1m_ul">
            <ul>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神 </a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
              <li><a href="#" className="fl">各单位传达贯彻省公司2016年工作会议精神2016年......</a><span className="fr">2016-1-27</span></li>
            </ul>
          </div>
        </div>
        <div className="mc1R">
          <div className="mc1rTop">
            <div className="mc1_t">组织信息</div>
            <div className="mc1r_info">
              <p>组织代码：10.11.12.3</p>
              <p>组织名称：中共中移全通系统集成有限公司总支委员会</p>
              <p>联系电话：0311-98976540</p>
              <p>传　　真： 0311-87965653</p>
              <p>地　　址：河北省石家庄市裕华区青园街220号</p>
            </div>
          </div>
          <div className="imgBlock"><img src="/assets/images/hm_ad2.jpg" width="226" height="88" /></div>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

export default Info
