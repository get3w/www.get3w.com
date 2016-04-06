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
  isSelf: boolean
  isOp: boolean
  onMain: (isEdit: boolean, record: models.Record) => void
}

interface S {
  record: Array<models.Record>
}

export default class View extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      record: null
    }
  }

  componentDidMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps) {
    this.load()
  }

  load() {
    client.records.searchByAll(0, this.props.user.userName, '思想汇报', '', '', (err: models.Error, res: Array<models.Record>) => {
      if (!err && res) {
        this.setState({
          record: res
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    if (!this.state.record) return <InnerLoading />
    const user = this.props.user

    let addBtnEl = null
    if (!this.props.isSelf && this.props.isOp) {
      addBtnEl = (
        <div className="m2fm_sbxBtn">
          <a onClick={this.props.onMain.bind(this, true, null) } className="m2btn_a1" href="javascript:;">新 增</a>
        </div>
      )
    }

    let i = 1
    const listEl = this.state.record.map((record: models.Record) => {
      return (
        <tr key={record.id}>
          <td className="center">{i++}</td>
          <td className="center">{utils.Translate.toShortDate(record.happenDate)}</td>
          <td className="center">
            <a onClick={ (e) => {
              utils.Swal.confirm('此操作将删除选中项目，确定吗', '', (isConfirm: boolean) => {
                if (isConfirm) {
                  utils.DOM.loading(true)
                  client.records.delete(record.id, () => {
                    utils.DOM.loading(false)
                    this.load()
                  })
                }
              })
            }} href="javascript:;" className="m2fm_abtn">删 除</a>
            <a onClick={ (e) => {
              this.props.onMain(true, record)
            }} href="javascript:;" className="m2fm_abtn">修 改</a>
          </td>
        </tr>
      )
    })

    return (
      <div className="m2fm_tabBox m2fm_tabBox2 m2per_table">
        <table width="100%">
          <tbody>
            <tr className="m2th">
              <td width="24%" className="center">序 号</td>
              <td width="42%" className="center">时 间</td>
              <td width="34%" className="center">操作</td>
            </tr>
            {listEl}
          </tbody>
        </table>
        {addBtnEl}
      </div>
    )
  }
}
