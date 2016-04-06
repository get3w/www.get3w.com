import * as React from 'react'
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    userName: string
  }
}

interface S {
  isSelfOrOp: boolean
  user: models.User
  records: Array<models.Record>
}

class UserDAXXPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelfOrOp: props.authState.user.userName === props.params.userName || this.props.orgState.isOp,
      user: null,
      records: null
    }
  }

  componentDidMount() {
    if (this.props.authState.user.userName === this.props.params.userName) {
      this.load(this.props.authState.user)
    } else {
    }
  }

  load(user: models.User) {
    client.records.list(user.userName, (err: models.Error, res: Array<models.Record>) => {
      this.setState({
        isSelfOrOp: this.state.isSelfOrOp,
        user: user,
        records: res
      })
    })
  }

  list(periodAndRecords: { [index: string]: Array<models.Record> }, periods: Array<string>, period: string) {
    this.state.records.forEach((record: models.Record) => {
      if (record.period === period) {
        let records = periodAndRecords[record.period]
        if (!records) {
          periods.push(record.period)
          records = []
        }
        records.push(record)
        periodAndRecords[record.period] = records
      }
    })
  }

  render() {
    if (!this.state.records) return <InnerLoading />

    let periodAndRecords: { [index: string]: Array<models.Record> } = {}
    let periods = []
    this.list(periodAndRecords, periods, '申请人')
    this.list(periodAndRecords, periods, '积极分子')
    this.list(periodAndRecords, periods, '发展对象')
    this.list(periodAndRecords, periods, '预备党员')
    this.list(periodAndRecords, periods, '党员')

    let elements = periods.map((period: string) => {
      const lis = periodAndRecords[period].map((record: models.Record) => {
        let attachEl = null
        if (record.attachmentPaths) {
          attachEl = (
            <span>
              （<a className="cor_red" target="_blank">查看</a>）
            </span>
          )
        }
        return (
          <li key={record.id}>
            <a href="javascript:;" className="m2per_a1">{utils.Translate.toShortDate(record.happenDate)} {record.summary}</a>
            {attachEl}
          </li>
        )
      })
      return (
        <div key={period}>
        <div className="m2per_st2">{period}阶段</div>
        <div className="m2per_u1">
          <ul>
            {lis}
          </ul>
        </div>
        </div>
      )
    })


    return (
      <div className="mper_fm">
        <div className="m2per_st1">当前组织机构 : {this.state.user.orgName}</div>
        <div className="m2per_t1">档案信息</div>
        {elements}
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

export default connect(
  mapStateToProps
)(UserDAXXPage);
