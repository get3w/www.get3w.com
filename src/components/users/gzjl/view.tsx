import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  isSelfOrOp: boolean
  onMain: (isEdit: boolean, userWork: models.UserWork) => void
}

interface S {
  userWorks: Array<models.UserWork>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      userWorks: null
    }
  }

  componentDidMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps) {
    this.load()
  }

  load() {
    client.userWorks.list(this.props.user.userName, (err: models.Error, res: Array<models.UserWork>) => {
      if (!err && res) {
        this.setState({
          userWorks: res
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    if (!this.state.userWorks) return <InnerLoading />
    const user = this.props.user

    let addBtnEl = null
    if (this.props.isSelfOrOp) {
      addBtnEl = (
        <div className="m2fm_sbxBtn">
          <a onClick={this.props.onMain.bind(this, true, null) } className="m2btn_a1" href="javascript:;">新 增</a>
        </div>
      )
    }

    const listEl = this.state.userWorks.map((userWork: models.UserWork) => {
      return (
        <div className="m2per_u2 m2per_u5" key={userWork.id}>
          <ul>
            <li><strong className="m2per_sbnm">公司：</strong>
              <div className="m2per_txtInfo">{userWork.company}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">部门：</strong>
              <div className="m2per_txtInfo">{userWork.department}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">职务：</strong>
              <div className="m2per_txtInfo">{userWork.position}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">开始时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(userWork.startTime)}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">截止时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(userWork.endTime)}</div></li>
          </ul>
          <div className="m2per_btnBox2">
            <a onClick={ (e) => {
              this.props.onMain(true, userWork)
            }} href="javascript:;" className="m2fm_pubBtn2 fl">修 改</a>
            <a onClick={ (e) => {
              utils.Swal.confirm('此操作将删除选中项目，确定吗', '', (isConfirm: boolean) => {
                if (isConfirm) {
                  utils.DOM.loading(true)
                  client.userWorks.delete(userWork.id, () => {
                    utils.DOM.loading(false)
                    this.load()
                  })
                }
              })
            }} href="javascript:;" className="m2fm_pubBtn1 fr">删 除</a>
          </div>
        </div>
      )
    })

    return (
      <div>
        {listEl}
        {addBtnEl}
      </div>
    )
  }
}
