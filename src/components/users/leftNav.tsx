import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';

interface P {
  userName: string
  user: models.User
  isSelf: boolean
  isOp: boolean
}

export default class LeftNav extends React.Component<P, {}> {
  render() {
    const user = this.props.user

    let ageEl = null;
    if (user.partyDate && user.partyDate.getFullYear) {
      const todayDate = new Date();
      const todayYear = todayDate.getFullYear()
      const partyYear = user.partyDate.getFullYear()
      const age = todayYear - partyYear
      if (age) {
        ageEl = <span>党龄：{age}年</span>
      }
    }

    let isSelfOrOp = this.props.isSelf || this.props.isOp

    return (
      <div className="mper_nav">
        <div className="mper_head">
          <img width="122" height="122" />
          <p>
            姓名：{user.displayName}<br />
            身份：{user.userType}<br />
            {ageEl}
          </p>
        </div>
        <div className="mper_t1">基础资料</div>
        <div className="mper_nul">
          <ul>
            <li>
              <Link to={links.USERS_JBXX_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">基本信息</Link>
            </li>
            <li>
              <Link to={links.USERS_XXZL_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">详细资料</Link>
            </li>
            <li style={{display: isSelfOrOp ? "block" : "none"}}>
              <Link to={links.USERS_XGTX_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">修改头像</Link>
            </li>
            <li>
              <Link to={links.USERS_DJXX_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">党籍信息</Link>
            </li>
            <li>
              <Link to={links.USERS_JYJL_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">教育经历</Link>
            </li>
            <li>
              <Link to={links.USERS_GZJL_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">工作经历</Link>
            </li>
          </ul>
        </div>
        <div className="mper_t1">档案资料</div>
        <div className="mper_nul">
          <ul>
            <li style={{display: isSelfOrOp ? "block" : "none"}}>
              <Link to={links.USERS_SXHB_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">思想汇报</Link>
            </li>
            <li>
              <Link to={links.USERS_ZBDHJY_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">支部大会决议</Link>
            </li>
            <li>
              <Link to={links.USERS_DAXX_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">档案信息</Link>
            </li>
            <li>
              <Link to={links.USERS_FZLL_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">发展履历</Link>
            </li>
          </ul>
        </div>
        <div className="mper_t1">日常操作</div>
        <div className="mper_nul">
          <ul>
            <li>
              <a href="#" className="mper_a2">党费缴纳</a>
            </li>
            <li style={{display: this.props.isSelf && this.props.user.userType === '党员' ? "block" : "none"}}>
              <Link to={links.USERS_ZHUANCHU_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">组织关系转接</Link>
            </li>
            <li>
              <Link to={links.USERS_XGMM_.replace(':userName', this.props.userName)} className="mper_a2" activeClassName="mper_a2 m2pos_cut">密码修改</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
