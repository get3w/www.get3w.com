import * as React from 'react'
import { bindActionCreators } from 'redux'
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
    id: string
  }
}

interface S {
  data: Object
}

class ContentsPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    client.request.get('http://localhost:9393/test', null, (err: models.Error, data: Object, status?: number) => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    if (!this.state.data) return <InnerLoading />

    return (
      <div>
        {this.state.data}
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
