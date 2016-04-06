import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  openMain: (mainType: string, orgAdminUserNames: Array<string>) => void
}

interface S {
  orgAdmins: Array<models.OrgAdmin>
}

export default class List extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgAdmins: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.id)
  }

  load(orgID: number) {
    client.orgAdmins.list('', orgID, (err: models.Error, res) => {
      this.state.orgAdmins = res
      this.setState(this.state)
    })
  }

  onDeleteClick(id, e) {
    utils.DOM.loading(true)
    client.orgAdmins.delete(id, () => {
      utils.DOM.loading(false)
      this.load(this.props.org.id)
    })
  }

  render() {
    const userNames = this.state.orgAdmins.map((orgAdmin: models.OrgAdmin) => {
      return orgAdmin.userName
    });
    const listEl = this.state.orgAdmins.map((orgAdmin: models.OrgAdmin) => {
      return (
        <tr key={orgAdmin.id}>
          <td className="center">{orgAdmin.displayName}</td>
          <td className="center">
            <a onClick={this.onDeleteClick.bind(this, orgAdmin.id)} href="javascript:;" className="cor_red">删除</a>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <div className="clickTag mchg1">
          <div className="chgConList" style={{height: "300px"}}>
            <div className="chgCon">
              <table className="m2lay_tab1" width="100%" style={{marginTop: "10px"}}>
                <tr className="m2lay_th1">
                  <td className="center">姓 名</td>
                  <td className="center">操 作</td>
                </tr>
                {listEl}
              </table>
              <br />
              <div >
                <a onClick={this.props.openMain.bind(this, 'add', userNames) } className="m2addBtn" style={{float: "right"}} href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
