import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as links from '../../constants/links';
import SubNav from '../../components/zz/subNav'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as states from '../../../constants/states';
import client from '../../../lib/client';
import * as utils from '../../../lib/utils';

interface P {
  params: {
    id: string
  }
}

interface S {
  oa: models.OrgActivity
}

export default class IndexPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      oa: null,
    }
  }

  componentDidMount() {
    
  }

  render() {
    if (!this.state.oa) return <InnerLoading />
    const oa = this.state.oa

    return (
      <div>
        <div className="mTop">
          <Link to={links.INDEX} className="mTop_back"></Link>
          组织动态
        </div>
        <div className="mMes_t">{oa.title}</div>
        <div className="mMes_info">{utils.Translate.toLongDate(oa.addDate)}</div>
        <div className="mMes_txt">
          <p>{oa.content}</p>
        </div>
      </div>
    )
  }
}
