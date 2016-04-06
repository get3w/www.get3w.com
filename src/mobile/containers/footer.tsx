import * as React from 'react'
import { Link, IndexLink } from 'react-router';
import * as links from '../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <div className="ftEmpty"></div>
      <ul className="footer">
        <li>
          <IndexLink to={links.INDEX} className="foot_a" activeClassName="on">
            <img src="/assets/mobile/images/ft_icon1.png" />
            <img className="foot_aimg" src="/assets/mobile/images/ft_icon1a.png" />
            首页
          </IndexLink>
        </li>
        <li>
          <Link to={links.YW} className="foot_a" activeClassName="on">
            <img src="/assets/mobile/images/ft_icon2.png" />
            <img className="foot_aimg" src="/assets/mobile/images/ft_icon2a.png" />
            业务
          </Link>
        </li>
        <li>
          <Link to={links.ZZ} className="foot_a" activeClassName="on">
            <img src="/assets/mobile/images/ft_icon3.png" />
            <img className="foot_aimg" src="/assets/mobile/images/ft_icon3a.png" />
            组织
          </Link>
        </li>
      </ul>
      </div>
    )
  }
}
