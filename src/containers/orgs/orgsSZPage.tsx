import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import * as constants from '../../constants';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as orgActions from '../../actions/orgActions';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  orgActions?: actions.OrgActions,
}

interface S {
  isEdit: boolean
  org: models.Org
}

class OrgsSZPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      org: _.assign({}, this.props.orgState.org)
    }
  }

  onChange(name: string, e) {
    this.state.org[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e) {
    utils.DOM.loading(true)
    client.orgs.edit(this.state.org, () => {
      utils.DOM.loading(false)
      this.state.isEdit = false
      this.setState(this.state)
    })
  }

  onCancel(e) {
    this.state.isEdit = false
    this.state.org = _.assign({}, this.props.orgState.org)
    this.setState(this.state)
  }

  render() {
    const org = new models.Org()

    let mainEl = null
    if (this.state.isEdit) {
      mainEl = (
        <div className="m2fm_tabBox" style={{ background: "#fafaee" }}>
          <div className="m2fm_u1">
            <ul>
              <li>
                <span className="m2fm_us1">组织代码：</span> {this.state.org.code}
              </li>
              <li>
                <span className="m2fm_us1">组织名称：</span> {this.state.org.orgName}
              </li>
              <li>
                <span className="m2fm_us1">联系电话：</span>
                <input value={this.state.org.tel} onChange={this.onChange.bind(this, 'tel')} className="m2fm_u1Int" type="text" />
              </li>
              <li>
                <span className="m2fm_us1">传　　真：</span>
                <input value={this.state.org.fax} onChange={this.onChange.bind(this, 'fax')} className="m2fm_u1Int" type="text" />
              </li>
              <li>
                <span className="m2fm_us1">地　　址：</span>
                <textarea value={this.state.org.address} onChange={this.onChange.bind(this, 'address')} className="m2fm_u1Int m2fm_u1Int2"></textarea>
                <div className="clear"></div>
              </li>
            </ul>
            <div className="clear"></div>
          </div>
          <div className="m2fm_sbxBtn">
            <a onClick={this.onSubmit.bind(this)} className="m2btn_a1" href="javascript:;">确 定</a>
            <a onClick={ this.onCancel.bind(this) } className="m2btn_a2" href="javascript:;">取 消</a>
          </div>
        </div>
      )
    } else {
      mainEl = (
        <div className="m2fm_tabBox" style={{ background: "#fafaee" }}>
          <div className="m2fm_u1">
            <ul>
              <li>
                <span className="m2fm_us1">组织代码：</span> {this.state.org.code}
              </li>
              <li>
                <span className="m2fm_us1">组织名称：</span> {this.state.org.orgName}
              </li>
              <li>
                <span className="m2fm_us1">联系电话：</span>
                {this.state.org.tel}
              </li>
              <li>
                <span className="m2fm_us1">传　　真：</span>
                {this.state.org.fax}
              </li>
              <li>
                <span className="m2fm_us1">地　　址：</span>
                {this.state.org.address}
                <div className="clear"></div>
              </li>
            </ul>
            <div className="clear"></div>
          </div>
          <div className="m2fm_sbxBtn">
            <a onClick={ (e) => { this.state.isEdit = true; this.setState(this.state) } } className="m2btn_a1" href="javascript:;">修 改</a>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="m2fm_stop"><div className="m2fm_bsx1">组织信息</div></div>
        {mainEl}
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orgActions: bindActionCreators(orgActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsSZPage);
