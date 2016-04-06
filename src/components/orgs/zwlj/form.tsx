import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  orgLeader: models.OrgLeader
  onClose: Function
}

interface S {
  org: models.Org
}

export default class ZWLJ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      org: this.props.org || new models.Org()
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      org: nextProps.org || new models.Org()
    })
  }

  onChange(name: string, e) {
    const org = this.state.org
    org[name] = e.target.value
    this.setState({ org: org });
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const org = this.state.org
    if (org.orgName) {
      utils.DOM.loading(true)
      client.orgs.edit(org, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          browserHistory.push(links.ORGS)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  render() {
    const org = this.state.org

    const title = '是否将现任领导转为往届领导'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ height: 340, width: 518, marginLeft: '-259px', marginTop: '-170px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: 30, paddingBottom: 10 }}>
            <ul>
              <li>
                <input name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
                是　　将上一届所有领导成员自动转为往届领导
              </li>
              <li>
                <input name="a" type="radio" className="lay-rad" style={{ position: 'relative', top: 1, marginRight: 6 }} />
                否　　回到换届选举列表界面
              </li>
            </ul>
          </div>
          <div className="m2btnBox2" style={{ paddingLeft: 145 }}>
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
