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
import KHFASZXZ from "../../../components/dwgz/khfaszxz/form"
import Confirm from "../../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  solutions: Array<models.TestSolution>
  winType: string
  id: number
  controls: { [index: string]: boolean }
  solutionName: string
  startDate: string
  endDate: string
}

class KHFASZ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      solutions: null,
      winType: '',
      id: null,
      controls: {},
      solutionName: null,
      startDate: null,
      endDate: null,
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load()
  }

  componentDidMount() {
    this.load()
  }

  load() {
    if (this.state.solutionName || this.state.startDate || this.state.endDate) {
      client.testSolutions.search(this.state.solutionName, this.state.startDate, this.state.endDate, (err: models.Error, res: Array<models.TestSolution>) => {
        this.state.solutions = res
        this.setState(this.state)
      })
    } else {
      client.testSolutions.list((err: models.Error, res: Array<models.TestSolution>) => {
        this.state.solutions = res
        this.setState(this.state)
      })
    }
  }

  onCalendarSelect(name: string, date: Date, e) {
    
    const dateStr = utils.Translate.toShortDate(date)
    this.state.controls[name] = !this.state.controls[name]
    this.state[name] = dateStr
    this.setState(this.state);
  }

  onClick(name: string, e) {
    this.state.controls[name] = !this.state.controls[name]
    this.setState(this.state)
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
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
      this.load()
    }
  }

  onSearch(e) {
    this.load()
  }

  onDelete(id, e) {
    client.testSolutions.delete(id, () => {
      this.onClose(true, e)
    })
  }

  onCopy(id, e) {
    client.testSolutions.copy(id, () => {
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.solutions) return <InnerLoading />

    let i = 1
    const listEl = this.state.solutions.map((solution: models.TestSolution) => {
      return (
        <tr key={solution.id}>
          <td className="center"><input type="checkbox" className="lay-rad" /></td>
          <td className="center">{i++}</td>
          <td className="left">{solution.solutionName}</td>
          <td className="center">{utils.Translate.toShortDate(solution.addDate) }</td>
          <td className="center">{solution.addDisplayName}</td>
          <td className="center">{solution.summary}</td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_KHFASZXZ, solution.id) } className="m2fm_abtn" href="javascript:;">编辑</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM + "-copy", solution.id) } className="m2fm_abtn" href="javascript:;">复制</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.COMMON_CONFIRM, solution.id) } className="m2fm_abtn" href="javascript:;">删除</a>
          </td>
        </tr>
      )
    })

    let formEl = null
    if (this.state.winType) {
      let solution = null
      this.state.solutions.forEach((m: models.TestSolution) => {
        if (this.state.id === m.id) {
          solution = m
        }
      })
      if (this.state.winType === constants.WinTypes.DWGZ_KHFASZXZ) {
        formEl = <KHFASZXZ user={this.props.authState.user} solution={solution} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除考核方案 " + solution.solutionName} onSubmit={this.onDelete.bind(this, solution.id) } onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM + "-copy") {
        formEl = <Confirm title={"复制考核方案 " + solution.solutionName} onSubmit={this.onCopy.bind(this, solution.id) } onClose={this.onClose.bind(this) } />
      }
    }

    let startDateEl = null
    let endDateEl = null
    if (this.state.controls['startDate']) {
      startDateEl = (
        <div style={{ position: "absolute", left: "55%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startDate") } />
        </div>
      )
    }
    if (this.state.controls['endDate']) {
      endDateEl = (
        <div style={{ position: "absolute", left: "55%", marginTop: "35px" }}>
          <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endDate") } />
        </div>
      )
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">方案名称：</span>
          <div className="m2fm_selContent">
            <input onChange={this.onChange.bind(this, "solutionName") } value={this.state.solutionName} type="text" className="m2fm_int" style={{ width: 250 }} />
          </div>
          <span className="m2fm_ss1">添加日期：</span>
          <input value={this.state.startDate} onClick={this.onClick.bind(this, "startDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 140 }} />
          {startDateEl}
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input value={this.state.endDate} onClick={this.onClick.bind(this, "endDate") } type="text" className="m2fm_int m2fm_int2 m2fm_int7" style={{ width: 140 }} />
          {endDateEl}
          <a onClick={this.onSearch.bind(this)} className="m2fm_pubBtn1" href="javascript:;">搜索</a>
        </div>

        <div className="m2fm_tabBox m2fm_tabBox2">
          <div className="m2fm_btn2">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.DWGZ_KHFASZXZ) } className="m2fm_pubBtn2" href="javascript:;">新 增</a>
          </div>
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="5%" className="center"><input type="checkbox" className="lay-rad" /></td>
                <td width="5%" className="center">&nbsp; </td>
                <td width="22%" className="left">方案名称 </td>
                <td width="12%" className="center">添加日期</td>
                <td width="13%" className="center">添加人 </td>
                <td width="26%" className="center">描述 </td>
                <td width="17%" className="center">操作</td>
              </tr>
              {listEl}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // render() {
  //   if (!this.state.solutions) return <InnerLoading />
  //
  //   const listEl = this.state.solutions.map((record: models.Solution) => {
  //     return (
  //       <tr key={record.id}>
  //         <td><a href={"/users/" + record.userName} target="_blank" className="cor_red">{record.displayName}</a></td>
  //         <td>{record.orgName}</td>
  //         <td>{record.remarks}</td>
  //         <td>{record.type2}</td>
  //         <td>{utils.Translate.toShortDate(record.happenDate)}</td>
  //       </tr>
  //     )
  //   })
  //
  //   let startDateEl = null
  //   let endDateEl = null
  //   if (this.state.controls['startDate']) {
  //     startDateEl = (
  //       <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
  //         <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "startDate")} />
  //       </div>
  //     )
  //   }
  //   if (this.state.controls['endDate']) {
  //     endDateEl = (
  //       <div style={{position: "absolute", left: "55%", marginTop: "35px"}}>
  //         <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, "endDate")} />
  //       </div>
  //     )
  //   }
  //
  //   return (
  //     <div>
  //       <div className="m2fm_stop" style={{position: "relative"}}>
  //         <span className="m2fm_ss1">变动情况：</span>
  //         <input onClick={this.onClick.bind(this, "solutionName") } value={this.state.solutionName} type="text" name="" className="m2fm_int m2fm_int3" />
  //         <div className="m2fm_selBox" style={{ position: "absolute", top: "50px", left: "0", display: this.state.controls["solutionName"] ? "block" : "none ", width: "270px" }}>
  //           <dl>
  //             <dd onClick={this.onValueChange.bind(this, "") }>全部</dd>
  //             <dd onClick={this.onValueChange.bind(this, "死亡") }>死亡</dd>
  //             <dd onClick={this.onValueChange.bind(this, "开除党籍") }>开除党籍</dd>
  //           </dl>
  //         </div>
  //
  //         <span className="m2fm_ss1">变动时间：</span>
  //         <input value={this.state.startDate} onClick={this.onClick.bind(this,"startDate")} type="text" className="m2fm_int m2fm_int2" />
  //         {startDateEl}
  //         <span className="m2fm_ss1 m2fm_ss2">至</span>
  //         <input value={this.state.endDate} onClick={this.onClick.bind(this,"endDate")} type="text" className="m2fm_int m2fm_int2" />
  //         {endDateEl}
  //         <input type="submit" name="" className="m2submit" value="" />
  //       </div>
  //       <div className="m2fm_tabBox m2fm_tabBox2">
  //         <table width="100%">
  //           <tbody>
  //             <tr className="m2th">
  //               <td>姓名</td>
  //               <td>原组织</td>
  //               <td>备注</td>
  //               <td>状态</td>
  //               <td>日期</td>
  //             </tr>
  //             {listEl}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   )
  // }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

export default connect(
  mapStateToProps
)(KHFASZ);
