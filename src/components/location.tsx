import * as React from 'react'
import { browserHistory } from 'react-router'

interface P {
  navTitle: string
  navUrl: string
  currentTitle?: string
}

export default class Location extends React.Component<P, {}> {
  onNavClick(){
    browserHistory.push(this.props.navUrl)
  }

  render() {
    if (this.props.currentTitle) {
      return (
        <div className="m2pos">
          <a className="m2pos_a" href="/">首页</a>
          &gt;
          <a className="m2pos_a" href="javascript:;" onClick={this.onNavClick.bind(this)}>{this.props.navTitle}</a>
          &gt;
          <span className="m2pos_cut">{this.props.currentTitle}</span>
        </div>
      )
    }

    return (
      <div className="m2pos">
        <a className="m2pos_a" href="/">首页</a>
        &gt;
        <a className="m2pos_a" href="javascript:;" onClick={this.onNavClick.bind(this)}>{this.props.navTitle}</a>
      </div>
    )
  }
}
