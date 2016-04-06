import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <div className="footerBg">
        <div className="footer">
          <a className="cor_bs" href="#">联系我们</a>
          &nbsp; 中国移动网上党校版权所有 &nbsp; 京ICP备05938475号
        </div>
      </div>
    )
  }
}

export default Footer
