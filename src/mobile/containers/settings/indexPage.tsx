import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';
import * as states from '../../../constants/states'
import * as constants from '../../constants'
import SubNav from '../../components/zz/subNav'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
}

export default class IndexPage extends React.Component<P, {}> {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.orgState)
  }

  componentDidMount() {
    this.load(this.props.orgState)
  }

  load(orgState: states.OrgState) {

  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <div className="mTop">
            <Link to={links.INDEX} className="mTop_back"></Link>
            设置
          </div>
          <ul className="mPer_u2">
            <li>
              <Link to={links.SETTINGS_TONGZHI}>通知提醒 <i className="mPer_arrow" /></Link>
            </li>
            <li>
              <a href="#">清理缓存 <i className="mPer_arrow" /></a>
            </li>
            <li>
              <Link to={links.SETTINGS_FEEDBACK}>意见反馈 <i className="mPer_arrow" /></Link>
            </li>
            <li>
              <a href="#">检查更新 <i className="mPer_arrow" /></a>
            </li>
            <li>
              <Link to={links.SETTINGS_ABOUT}>关于 <i className="mPer_arrow" /></Link>
            </li>
          </ul>
        </div>
      )
    }

    return this.props.children
  }
}
