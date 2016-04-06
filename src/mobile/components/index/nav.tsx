import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links'

interface P {
  onNavChange: (isNav: boolean) => void
}

class SubNav extends React.Component<P, {}> {
  render() {
    return (
      <div>
        <div onClick={this.props.onNavChange.bind(this, false)} className="mLayerBg"></div>
        <div className="mLayerMenu">
          <i />
          <ul>
            <li>
              <a className="mLayMenu_a" href="#">
                <img src="/assets/mobile/images/top_icon4.png" />扫一扫</a>
            </li>
            <li>
              <a className="mLayMenu_a" href="messAge.html">
                <img src="/assets/mobile/images/top_icon5.png" />消息</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SubNav
