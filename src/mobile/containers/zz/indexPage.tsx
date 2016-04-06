import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links';
import * as states from '../../../constants/states'
import * as constants from '../../constants'
import * as models from '../../../api/models'
import DongTai from './dongTai'
import LingDao from './lingDao'
import XinXi from './xinXi'
import QieHuan from './qieHuan'

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  mainType: string
  org: models.Org
}

export class MainType {
  static DONGTAI = "DONGTAI"
  static LINGDAO = "LINGDAO"
  static XINXI = "XINXI"
  static QIEHUAN = "QIEHUAN"
}

class IndexPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      mainType: MainType.DONGTAI,
      org: props.orgState.org
    }
  }

  onMainChange(mainType: string, org: models.Org) {
    this.setState({
      mainType: mainType,
      org: org
    })
  }

  render() {
    let mainEl = null
    if (this.state.mainType === MainType.DONGTAI) {
      mainEl = <DongTai orgRoot={this.props.orgState.org} org={this.state.org} onMainChange={this.onMainChange.bind(this)} />
    } else if (this.state.mainType === MainType.LINGDAO) {
      mainEl = <LingDao orgRoot={this.props.orgState.org} org={this.state.org} onMainChange={this.onMainChange.bind(this)} />
    } else if (this.state.mainType === MainType.XINXI) {
      mainEl = <XinXi orgRoot={this.props.orgState.org} org={this.state.org} onMainChange={this.onMainChange.bind(this)} />
    } else if (this.state.mainType === MainType.QIEHUAN) {
      mainEl = <QieHuan orgRoot={this.props.orgState.org} org={this.state.org} onMainChange={this.onMainChange.bind(this)} />
    }

    return mainEl
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
)(IndexPage);
