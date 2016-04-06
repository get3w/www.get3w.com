import * as React from 'react'
import { IndexLink, Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
                <div className="mTop">
                    <Link to={links.INDEX} className="mTop_back"></Link>
                    切换角色
                </div>
                <ul className="m2u1">
                    <li><a href="index.html"><input className="m2chk" type="checkbox" />中移全通系统集成有限公司总支部组织委员</a></li><a href="index.html">
                    </a><li><a href="index.html" /><a href="index.html"><input type="checkbox" className="m2chk" defaultChecked />全通综合部支部组织委员</a></li><a href="index.html">
                    </a></ul><a href="index.html">
                </a></div>


    )
  }
}
