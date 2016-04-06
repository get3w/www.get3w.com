import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

interface P {
  children?: any
}

export default class IndexPage extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <div className="mTop">
            <a href="#" className="mTop_perIcon" />
            业务
          </div>
          <ul className="m2itmUl autoImg">
            <li>
              <Link to={links.YW_DANGFEI}><img src="/assets/mobile/images/m2itmBg.jpg" /></Link>
            </li>
            <li>
              <a href="#"><img src="/assets/mobile/images/m2itmBg2.jpg" /></a>
            </li>
            <li>
              <a href="#"><img src="/assets/mobile/images/m2itmBg3.jpg" /></a>
            </li>
          </ul>
        </div>
      )
    }

    return this.props.children
  }
}
