import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as authActions from '../../../actions/authActions';

interface P {
  authActions?: actions.AuthActions,
  authState?: states.AuthState,
  user: models.User
  onMain: (isEdit: boolean) => void
  params: {
    userName: string
  }
}

interface S {
  user: models.User
}

class Edit extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      user: nextProps.user
    })
  }

  onChange(name: string, e) {
    const user = this.state.user
    user[name] = e.target.value
    this.setState({ user: user });
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const user = this.state.user
    utils.DOM.loading(true)
    
  }

  render() {
    const user = this.state.user

    return (
      <div>
        <div className="m2fm m2per_u6">
          <ul>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 登录名：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 性  别：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>男</dd>
                  <dd>女</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 姓  名：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 出生年月：</span>
              <input className="m2fm_int m2fm_int2" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 身份证号：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 民  族：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"> 学  位：</span>
              <input placeholder="博士" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>博士</dd>
                  <dd>博士</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 学  历：</span>
              <input placeholder="大专" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>大专</dd>
                  <dd>本科</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 毕业院校：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 入党时间：</span>
              <input className="m2fm_int m2fm_int2" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1">
                <strong className="cor_red">*</strong> 联系电话：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 党员状态：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"> 电子邮箱：</span>
              <input className="m2fm_int" name="" type="text" />
            </li>
          </ul>
          <div className="clear">
          </div>
        </div>
        <div className="m2fm_sbxBtn">
          <a className="m2btn_a1" href="javascript:;">修 改</a>
          <a className="m2btn_a2" href="javascript:;">取 消</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
