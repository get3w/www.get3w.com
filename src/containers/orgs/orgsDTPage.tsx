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
import ZZDTGLXZ from "../../components/orgs/zzdtglxz/form"
import Confirm from "../../components/common/confirm"

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  oas: Array<models.OrgActivity>
  title: string
  winType: string
  id: number
}

class OrgsDTPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      oas: null,
      title: '',
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
    client.orgActivities.list(orgID, this.state.title, (err: models.Error, res: Array<models.OrgActivity>) => {
      this.setState({
        oas: res,
        title: this.state.title,
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

  onClose(isReload: boolean) {
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

  onDelete(oa: models.OrgActivity, e) {
    this.onEdit(constants.WinTypes.COMMON_CONFIRM, oa.id, e)
  }

  render() {
    if (!this.state.oas) return <InnerLoading />

    const listEl = this.state.oas.map((oa: models.OrgActivity) => {
      let isTopEl =
      <a onClick={ (e) => {
        oa.isTop = true
        utils.DOM.loading(true)
        client.orgActivities.edit(oa, (err, res) => {
          utils.DOM.loading(false)
          this.load(this.props.orgState.org.id)
        })
      }} className="m2fm_abtn" href="javascript:;">置顶</a>

      if(oa.isTop){
      isTopEl = <a onClick={ (e) => {
          oa.isTop = false
          utils.DOM.loading(true)
          client.orgActivities.edit(oa, (err, res) => {
            utils.DOM.loading(false)
            this.load(this.props.orgState.org.id)
          })
        }} className="m2fm_abtn" href="javascript:;">取消置顶</a>
      }

      return (
        <tr key={oa.id}>
          <td className="left"><a href={'/contents/' + oa.id} target="_blank" className="cor_red">{oa.title}</a></td>
          <td className="center">{utils.Translate.toShortDate(oa.addDate)}</td>
          <td>&nbsp; </td>
          <td className="center">
            <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_ZZDTGLXZ, oa.id)} className="m2fm_abtn" href="javascript:;">编辑</a>
            {isTopEl}
            <a onClick={ this.onDelete.bind(this, oa) } className="m2fm_abtn" href="javascript:;">删除</a>
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
      let oa = null
      this.state.oas.forEach((o: models.OrgActivity) => {
        if (this.state.id === o.id) {
          oa = o
        }
      })

      if (this.state.winType === constants.WinTypes.ORGS_ZZDTGLXZ) {
        formEl = <ZZDTGLXZ org={this.props.orgState.org} oa={oa} onClose={this.onClose.bind(this) } />
      } else if (this.state.winType === constants.WinTypes.COMMON_CONFIRM) {
        formEl = <Confirm title={"删除组织动态　" +　oa.title} onSubmit={(confirm: boolean) => {
          if (confirm) {
            utils.DOM.loading(true)
            client.orgActivities.delete(oa.id, () => {
              utils.DOM.loading(false)
              this.onClose(true)
            })
          }
        }} onClose={this.onClose.bind(this, true)} />
      }
    }

    return (
      <div>
        {formEl}
        <div className="m2fm_stop" style={{ paddingRight: 17 }}>
          <span className="m2fm_ss1">组织动态标题：</span>
          <input value={this.state.title} onChange={this.onChange.bind(this, "title")} type="text" className="m2fm_int m2fm_int8" style={{ width: 330 }} />
          <a onClick={this.onSearch.bind(this)} href="javascript:;" className="m2fm_pubBtn1">搜 索</a>
          <a onClick={this.onEdit.bind(this, constants.WinTypes.ORGS_ZZDTGLXZ, 0) } href="javascript:;" className="m2fm_pubBtn2" style={{ float: 'right' }}>新建组织动态</a>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2pdTab">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="60%" className="left">组织动态标题</td>
                <td width="15%" className="center"> 时间 </td>
                <td width="5%">&nbsp; </td>
                <td width="20%" className="center">操作</td>
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
)(OrgsDTPage);
