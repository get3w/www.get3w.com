import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as constants from '../../constants';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as actions from '../../actions/authActions';
import HJXJCK from "../../components/orgs/hjxjck/form"
import HJXJXZ from "../../components/orgs/hjxjxz/form"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  ehs: Array<models.ElectionHistory>
  periodNum: number
  winType: string
  id: number
}

class OrgsHJPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      ehs: null,
      periodNum: 0,
      winType: '',
      id: null
    }
  }

  componentWillReceiveProps(nextProps: P){
    this.load(nextProps.orgState.org.id)
  }

  componentDidMount() {
    this.load(this.props.orgState.org.id)
  }

  load(orgID: number) {
    client.electionHistories.list(orgID, this.state.periodNum, (err: models.Error, res: Array<models.ElectionHistory>) => {
      this.setState({
        ehs: res,
        periodNum: this.state.periodNum,
        winType: '',
        id: null
      })
    })
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
      this.load(this.props.orgState.org.id)
    }
  }

  onChange(name: string, e) {
    this.state[name] = e.target.value
    this.setState(this.state);
  }

  onSearch(e) {
    this.load(this.props.orgState.org.id)
  }

  onDelete(id, e) {
    client.orgs.delete(id, () => {
      this.onClose(true, e)
    })
  }

  render() {
    if (!this.state.ehs) return <InnerLoading />

    const listEl = this.state.ehs.map((eh: models.ElectionHistory) => {
      let titleEl = null;
      if(eh.content && eh.content.length > 35){
        titleEl = <a href="#" title={eh.content}>{eh.content.substring(0,35)} </a>;
      } else {
        titleEl = eh.content
      }
      return (
        <tr key={eh.id}>
          <td>{eh.periodNum}</td>
          <td>{eh.serviceLife}</td>
          <td>{utils.Translate.toShortDate(eh.happenDate)}</td>
          <td>{eh.mustAttendNum}</td>
          <td>{eh.attendNum}</td>
          <td>
            <p className="m2fm_pa">{titleEl}</p>
          </td>
          <td>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_HJXJXZ, eh.id)} href="javascript:;" className="m2fm_abtn">编辑</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_HJXJCK, eh.id)} href="javascript:;" className="m2fm_abtn">查看</a>
          </td>
        </tr>
      )
    })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="#" className="m2fmPage_a">＜</a>
    //     <a href="#" className="m2fmPage_a on">1</a>
    //     <a href="#" className="m2fmPage_a">2</a>
    //     <a href="#" className="m2fmPage_a">3</a>
    //     <a href="#" className="m2fmPage_a">4</a>
    //     <a href="#" className="m2fmPage_a">5</a>
    //     <a href="#" className="m2fmPage_a">6</a>
    //     <a href="#" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="#" className="m2fmPage_a">99</a>
    //     <a href="#" className="m2fmPage_a">100</a>
    //     <a href="#" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    let formEl = null
    if (this.state.winType) {
      let eh = null
      this.state.ehs.forEach((o: models.ElectionHistory) => {
        if (this.state.id === o.id) {
          eh = o
        }
      })

      if (this.state.winType === constants.WinTypes.ORGS_HJXJCK) {
        formEl = <HJXJCK org={this.props.orgState.org} eh={eh} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.ORGS_HJXJXZ) {
        formEl = <HJXJXZ eh={eh} org={this.props.orgState.org} user={this.props.authState.user} onClose={this.onClose.bind(this) } />
      }
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop">
          <span className="m2fm_ss1">换届届数：</span>
          <input value={this.state.periodNum ? this.state.periodNum + '' : ''} onChange={this.onChange.bind(this, 'periodNum')} type="text" name="" className="m2fm_int m2fm_int4" placeholder="" />
          <input onClick={this.onSearch.bind(this)} type="submit" name="" className="m2submit" value="" />
          <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_HJXJXZ, 0)} href="javascript:;" className="m2fm_btn1">新增换届记录</a>
        </div>
        <div className="m2fm_tabBox">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="6%">界数</td>
                <td width="10%">任期年限</td>
                <td width="10%">换届时间</td>
                <td width="13%">应到会人数</td>
                <td width="13%">实到会人数</td>
                <td width="34%">选举情况</td>
                <td width="14%">编辑</td>
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
)(OrgsHJPage);
