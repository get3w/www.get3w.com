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
  onMain: (isEdit: boolean, userEducation: models.UserEducation) => void
}

interface S {
  userEducations: Array<models.UserEducation>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      userEducations: null
    }
  }

  componentDidMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps) {
    this.load()
  }

  load() {
    client.userEducations.list(this.props.user.userName, (err: models.Error, res: Array<models.UserEducation>) => {
      if (!err && res) {
        this.setState({
          userEducations: res
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    if (!this.state.userEducations) return <InnerLoading />
    const user = this.props.user

    let addBtnEl = null
    if (this.props.isSelfOrOp) {
      addBtnEl = (
        <div className="m2fm_sbxBtn">
          <a onClick={this.props.onMain.bind(this, true, null) } className="m2btn_a1" href="javascript:;">新 增</a>
        </div>
      )
    }

    const listEl = this.state.userEducations.map((userEducation: models.UserEducation) => {
      return (
        <div className="m2per_u2 m2per_u5" key={userEducation.id}>
          <ul>
            <li><strong className="m2per_sbnm">学历：</strong>
              <div className="m2per_txtInfo">{userEducation.degree}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">学校：</strong>
              <div className="m2per_txtInfo">{userEducation.school}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">开始时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(userEducation.startTime)}</div>
            </li>
            <li>
              <strong className="m2per_sbnm">截止时间：</strong>
              <div className="m2per_txtInfo">{utils.Translate.toShortDate(userEducation.endTime)}</div></li>
          </ul>
          <div className="m2per_btnBox2">
            <a onClick={ (e) => {
              this.props.onMain(true, userEducation)
            }} href="javascript:;" className="m2fm_pubBtn2 fl">修 改</a>
            <a onClick={ (e) => {
              utils.Swal.confirm('此操作将删除选中项目，确定吗', '', (isConfirm: boolean) => {
                if (isConfirm) {
                  utils.DOM.loading(true)
                  client.userEducations.delete(userEducation.id, () => {
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
