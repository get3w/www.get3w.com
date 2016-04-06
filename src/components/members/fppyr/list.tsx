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
  openMain: (mainType: string, culturist: models.Culturist, culturistUserNames: Array<string>) => void
}

interface S {
  isCurrent: boolean
  culturists: Array<models.Culturist>
}

export default class FPPYR extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isCurrent: true,
      culturists: []
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.user.userName, true)
  }

  componentDidMount() {
    this.load(this.props.user.userName, true)
  }

  load(userName: string, isCurrent: boolean) {
    client.culturists.list(userName, isCurrent, (err: models.Error, res) => {
      this.state.culturists = res
      this.state.isCurrent = isCurrent
      this.setState(this.state)
    })
  }

  openCurrent(isCurrent: boolean, e) {
    this.load(this.props.user.userName, isCurrent)
  }

  render() {
    const culturistUserNames = this.state.culturists.map((culturist: models.Culturist) => {
      return culturist.culturistUserName
    });
    const listEl = this.state.culturists.map((culturist: models.Culturist) => {
      let opEl = null
      if (this.props.isOp && this.state.isCurrent) {
        opEl = (
          <a onClick={this.props.openMain.bind(this, 'add', culturist, culturistUserNames) } href="javascript:;" className="m2fm_abtn">更换</a>
        )
      } else {
        opEl = utils.Translate.toShortDate(culturist.endTime)
      }
      return (
        <tr key={culturist.id}>
          <td className="center">{culturist.culturistDisplayName}</td>
          <td className="center">{utils.Translate.toShortDate(culturist.startTime)}</td>
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
          <a onClick={this.props.openMain.bind(this, 'add', null, culturistUserNames) } className="m2addBtn" style={{float: "right"}} href="javascript:;"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></a>
        </div>
      )
    }

    return (
      <div>
        <div className="clickTag mchg1">
          <div className="chgBtnList">
            <ul>
              <li className={this.state.isCurrent ? "chgBtn chgCutBtn" : "chgBtn"} onClick={this.openCurrent.bind(this, true) }>当前培养人</li>
              <li className={this.state.isCurrent ? "chgBtn" : "chgBtn chgCutBtn"} onClick={this.openCurrent.bind(this, false) }>历史培养人</li>
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
