import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Message extends React.Component<{}, {}> {
  render() {
    return (
      <div className="hm_mes">
         <span className="hm_msIcon">通知消息：</span>
         <div className="hm_mScroll">
          <ul>
           <li><a href="#">关于2016年度党员登陆中国移动网上大学培训的通知</a></li>
           <li><a href="#">中国移动政企分公司新入党员工名单出炉</a></li>
           <li><a href="#">关于2016年度党员登陆中国移动网上大学培训的通知</a></li>
           <li><a href="#">中国移动政企分公司新入党员工名单出炉</a></li>
          </ul>
         </div>
      </div>
    )
  }
}

export default Message
