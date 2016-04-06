import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links'
import VIEW from '../../components/users/basic/view'
import EDIT from '../../components/users/basic/edit'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  params: {
    id: string
  }
}

interface S {
  oa: models.OrgActivity
}

class ContentsPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      oa: null,
    }
  }

  componentDidMount() {
    client.orgActivities.get(this.props.params.id, (err: models.Error, res: models.OrgActivity) => {
      if (!err && res) {
        this.setState({
          oa: res
        })
      } else {
        utils.Swal.error(err)
      }
    })
  }

  render() {
    if (!this.state.oa) return <InnerLoading />
    const oa = this.state.oa

    return (
      <div className="main2">
        <div className="m2pos"><a className="m2pos_a" href="/">首页</a> &gt; <span className="m2pos_cut">组织动态</span></div>
        <div className="m2news_t">{oa.title}</div>
        <div className="m2news_info">发布时间:{utils.Translate.toLongDate(oa.addDate)}</div>
        <div className="m2news_fun" style={{display: "none"}}>
          <span className="fl">[ 字号 <a className="b_font" href="javascript:;">大</a> <a className="m_font" href="javascript:;">中</a> <a className="s_font" href="javascript:;">小</a>]　[<a href="#">打印</a>]</span>
        </div>
        <div className="m2news_editor">
          <p>{oa.content}</p>
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
)(ContentsPage);
