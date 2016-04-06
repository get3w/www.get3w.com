import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.SETTINGS} className="mTop_back"></Link>
          关于
        </div>
        <div className="m2Tlogo autoImg"><img src="/assets/mobile/images/lg_logo2.png" /></div>
        <div className="m2stxt1">这款软件是中移全通系统集成有限公司为集团公司开发的一款网上党建系统应用。</div>
      </div>
    )
  }
}
