import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Tongji extends React.Component<{}, {}> {
  render() {
    return (
      <div className="mcon3">
        <div className="mc2_t">党内统计信息</div>
        <div className="mc3Box">
          <div className="hd">
            <ul>
              <li className="on">党员及党组织 建设情况</li>
              <li>党员队伍情况</li>
              <li>发展党员情况</li>
              <li>申请入党情况</li>
              <li>党员组织情况</li>
            </ul>
          </div>
          <div className="bd">
            <div className="mc3Con">
              <div className="mc3L">
                <div className="mc3_st">党员的性别、民族、学历</div>
                <ul>
                  <li>
                    <img src="/assets/images/hm_bmicon1.jpg" width="76" height="76" />
                    <div className="mc3_nm">32.6%</div>
                    <div className="mc3_s1">女党员</div>
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                  </li>
                  <li>
                    <img src="/assets/images/hm_bmicon2.jpg" width="76" height="76" />
                    <div className="mc3_nm">32.6%</div>
                    <div className="mc3_s1">少数名族党员</div>
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                  </li>
                  <li>
                    <img src="/assets/images/hm_bmicon3.jpg" width="76" height="76" />
                    <div className="mc3_nm">32.6%</div>
                    <div className="mc3_s1">大专以上学历党员</div>
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                  </li>
                </ul>
              </div>
              <div className="mc3R">
                <div className="mc3_st mc3_st2">党员的性别、民族、学历</div>
                <div className="mc3r_od">
                  <span className="mc3r_s">24及以下党员</span>
                  <div className="mc3r_box">
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                    <div className="mc3_lg"><span style={{ width: "89.0%" }}></span></div>
                  </div>
                  <span className="mc3r_s">占党员总数89.0%</span>
                </div>
                <div className="mc3r_od">
                  <span className="mc3r_s">24及以下党员</span>
                  <div className="mc3r_box">
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                    <div className="mc3_lg"><span style={{ width: "89.0%" }}></span></div>
                  </div>
                  <span className="mc3r_s">占党员总数89.0%</span>
                </div>
                <div className="mc3r_od">
                  <span className="mc3r_s">24及以下党员</span>
                  <div className="mc3r_box">
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                    <div className="mc3_lg"><span style={{ width: "89.0%" }}></span></div>
                  </div>
                  <span className="mc3r_s">占党员总数89.0%</span>
                </div>
                <div className="mc3r_od">
                  <span className="mc3r_s">24及以下党员</span>
                  <div className="mc3r_box">
                    <div className="mc3_s2"><span className="cor_red">XXX</span>万名</div>
                    <div className="mc3_lg"><span style={{ width: "89.0%" }}></span></div>
                  </div>
                  <span className="mc3r_s">占党员总数89.0%</span>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    )
  }
}

export default Tongji
