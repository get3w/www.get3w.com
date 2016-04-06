import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  isOp: boolean
  openMain: (mainType: string, introducer: models.Introducer, introducerUserNames: Array<string>) => void
}

interface S {
  isCurrent: boolean
  introducers: Array<models.Introducer>
}

export default class FPPYR extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCurrent: true,
      introducers: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.user.userName, true)
  }

  componentDidMount() {
    this.load(this.props.user.userName, true)
  }

  load(userName: string, isCurrent: boolean) {
    client.introducers.list(userName, isCurrent, (err: models.Error, res) => {
      this.state.introducers = res
      this.state.isCurrent = isCurrent
      this.setState(this.state)
    })
  }

  openCurrent(isCurrent: boolean, e) {
    this.load(this.props.user.userName, isCurrent)
  }

  render() {
    const introducerUserNames = this.state.introducers.map((introducer: models.Introducer) => {
      return introducer.introducerUserName
    });
    const listEl = this.state.introducers.map((introducer: models.Introducer) => {
      let opEl = null
      if (this.state.isCurrent) {
        if (this.props.isOp) {
          opEl = (
            <a onClick={this.props.openMain.bind(this, 'add', introducer, introducerUserNames) } href="javascript:;" className="m2fm_abtn">更换</a>
          )
        }
      } else {
        opEl = utils.Translate.toShortDate(introducer.endTime)
      }
      return (
        <tr key={introducer.id}>
          <td className="center">{introducer.introducerDisplayName}</td>
          <td className="center">{utils.Translate.toShortDate(introducer.startTime)}</td>
          <td className="center">
            {opEl}
          </td>
        </tr>
      )
    })

    let addEl = null
    if (this.props.isOp && this.state.isCurrent && (!listEl || listEl.length < 2)) {
      addEl = (
        <div >
          <a onClick={this.props.openMain.bind(this, 'add', null, introducerUserNames) } className="m2addBtn" style={{float: "right"}} href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
        </div>
      )
    }

    return (
      <div>
        <div className="clickTag mchg1">
          <div className="chgBtnList">
            <ul>
              <li className={this.state.isCurrent ? "chgBtn chgCutBtn" : "chgBtn"} onClick={this.openCurrent.bind(this, true) }>当前介绍人</li>
              <li className={this.state.isCurrent ? "chgBtn" : "chgBtn chgCutBtn"} onClick={this.openCurrent.bind(this, false) }>历史介绍人</li>
            </ul>
          </div>
          <div className="chgConList">
            <div className="chgCon">
              <table className="m2lay_tab1" width="100%">
                <tr className="m2lay_th1">
                  <td className="center">姓 名</td>
                  <td className="center">开始时间</td>
                  <td className="center">{this.state.isCurrent ? "操 作" : "结束时间"}</td>
                </tr>
                {listEl}
              </table>
              <br />
              {addEl}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
