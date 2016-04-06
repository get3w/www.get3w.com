import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Yewu extends React.Component<{}, {}> {
  render() {
    return (
      <div className="mcon2">
        <div className="mc2_t">快捷业务入口</div>
        <div className="mc2Box">
          <a href="javascript:;" className="prev"></a>
          <div className="mc2_itms">
            <ul>
              <li>
                <a href="#" className="mc2_a">
                  <div className="mc2_imgIcon"><img src="/assets/images/mc3_icon1.png" width="35" height="35" /></div>
                  组织架构
                </a>
              </li>
              <li>
                <a href="#" className="mc2_a">
                  <div className="mc2_imgIcon"><img src="/assets/images/mc3_icon2.png" width="35" height="35" /></div>
                  党费管理
                </a>
              </li>
              <li>
                <a href="#" className="mc2_a">
                  <div className="mc2_imgIcon"><img src="/assets/images/mc3_icon3.png" width="35" height="35" /></div>
                  组织生活
                </a>
              </li>
              <li>
                <a href="#" className="mc2_a">
                  <div className="mc2_imgIcon"><img src="/assets/images/mc3_icon4.png" width="35" height="35" /></div>
                  会议纪要
                </a>
              </li>
              <li>
                <a href="#" className="mc2_a">
                  <div className="mc2_imgIcon"><img src="/assets/images/mc3_icon5.png" width="35" height="35" /></div>
                  订制快捷入口
                </a>
              </li>
            </ul>
          </div>
          <a href="javascript:;" className="next"></a>
        </div>
      </div>
    )
  }
}

export default Yewu
