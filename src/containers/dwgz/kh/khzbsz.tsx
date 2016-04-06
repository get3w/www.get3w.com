import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import Location from "../../../components/location"
import SubNav from "../../../components/partymembers/subNav"
import * as actions from '../../../actions/authActions';
import * as states from '../../../constants/states'
import * as constants from '../../../constants'
import KHZBSZXZ from "../../../components/dwgz/khzbszxz/form"
import Confirm from "../../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  typeNames: Array<string>
  metrics: Array<models.TestMetric>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  typeName: string
  content: string
}

class DYBDQK extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      typeNames: null,
      metrics: null,
      winType: '',
      id: null,
      controls: {},
      typeName: null,
      content: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(null, null)
    this.loadTypeNames()
  }

  componentDidMount() {
    this.load(null, null)
    this.loadTypeNames()
  }

  loadTypeNames() {
    client.testMetrics.getTypeNames((err: models.Error, res: Array<string>) => {
      this.state.typeNames = res
      this.setState(this.state)
    })
  }

  load(typeName: string, content: string) {
    if (typeName || content){
      client.testMetrics.search(typeName, content, (err: models.Error, res: Array<models.TestMetric>) => {
        this.state.metrics = res
        this.setState(this.state)
      })
    } else {
      client.testMetrics.list((err: models.Error, res: Array<models.TestMetric>) => {
        this.state.metrics = res
        this.setState(this.state)
      })
    }
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state)
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onValueChange(value: string, e) {
    this.state.typeName = value
    this.state.controls["typeName"] = false
    this.setState(this.state);
  }

  onEdit(winType, id, e) {
    this.state.winType = winType
    this.state.id = id
    this.setState(this.state)
  }

  onClose(isReload: boolean, e: React.MouseEvent) {
    this.state.winType = ''
    this.state.id = null
    this.setState(this.state)
    if (isReload) {
      this.load(this.state.typeName, this.state.content)
    }
  }

  onSearch(e) {
    this.load(this.state.typeName, this.state.content)
  }

  onDelete(id, e) {
    client.testMetrics.delete(id, () => {
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.metrics || !this.state.typeNames) return <InnerLoading />

    let i = 1
    const listEl = this.state.metrics.map((metric: models.TestMetric) => {
      return (
        <tr key={metric.id}>
          <td className="center"><input type="checkbox" className="lay-rad" /></td>
          <td className="center">{i++}</td>
          <td className="left"><a className="cor_red" href="#">{metric.content}</a></td>
          <td className="center">{metric.typeName}</td>
          <td className="center">{metric.standard}</td>
          <td className="center">{metric.gist}</td>
          <td width="6%" className="center">{metric.defaultPoint}</td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_KHZBSZXZ, metric.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM, metric.id) } className="m2fm_abtn" href="javascript:;">删除</a>
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let metric = null
      this.state.metrics.forEach((m: models.TestMetric) => {
        if (this.state.id === m.id) {
          metric = m
        }
      })
      if (this.state.winType === constants.WinTypes.DWGZ_KHZBSZXZ) {
        formEl = <KHZBSZXZ metric={metric} typeNames={this.state.typeNames} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除考核指标 " + metric.content} onSubmit={this.onDelete.bind(this, metric.id) } onClose={this.onClose.bind(this) } />
      }
    }

    let typeNamesEl = []
    if (this.state.typeNames) {
      this.state.typeNames.map((typeName: string) => {
        typeNamesEl.push(<dd key={typeName} onClick={this.onValueChange.bind(this, typeName) }>{typeName}</dd>)
      })
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">项 目：</span>
          <div className="m2fm_selContent">
            <input onClick={this.onClick.bind(this, "typeName") } value={this.state.typeName ? this.state.typeName : '全部'} type="text" className="m2fm_int m2fm_int3" style={{ width: 250, border: '1px solid #F8EBC8' }} />
            <div className="m2fm_selBox" style={{ position: "absolute", top: "50px", left: "0", display: this.state.controls["typeName"] ? "block" : "none ", width: "270px" }}>
              <dl>
                <dd onClick={this.onValueChange.bind(this, "") }>全部</dd>
                {typeNamesEl}
              </dl>
            </div>
          </div>
          <span className="m2fm_ss1">考核内容：</span>
          <input value={this.state.content} onChange={this.onChange.bind(this,"content")} type="text" className="m2fm_int" style={{ width: 362, float: 'left', border: '1px solid #F8EBC8' }} />
          <a onClick={this.onSearch.bind(this)} className="m2fm_pubBtn1" href="javascript:;">搜索</a>
        </div>

        <div className="m2fm_tabBox m2fm_tabBox2">
          <div className="m2fm_btn2">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_KHZBSZXZ) } className="m2fm_pubBtn2" href="javascript:;">新 增</a>
          </div>
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="4%" className="center"><input type="checkbox" className="lay-rad" /></td>
                <td width="3%" className="center">&nbsp; </td>
                <td width="37%" className="left">考核内容 </td>
                <td width="15%" className="center">项目</td>
                <td width="11%" className="center">考核标准 </td>
                <td width="12%" className="center">考核依据 </td>
                <td width="6%" className="center">分值</td>
                <td width="12%" className="center">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
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
)(DYBDQK);
