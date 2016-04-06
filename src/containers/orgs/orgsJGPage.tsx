import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as links from '../../constants/links';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import * as actions from '../../actions/authActions';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
}

interface S {
  parentID: number
  orgs: Array<models.Org>
  orgMap: { [index: number]: Array<models.Org> }
}

class OrgsJGPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      parentID: props.orgState.org.id,
      orgs: null,
      orgMap: {}
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.state.parentID = nextProps.orgState.org.id
    this.setState(this.state)
    this.load()
  }

  componentDidMount() {
    this.state.parentID = this.props.orgState.org.id
    this.setState(this.state)
    this.load()
  }

  load() {
    utils.DOM.loading(true)
    client.orgs.list(this.state.parentID, false, (err: models.Error, res: Array<models.Org>) => {
      utils.DOM.loading(false)
      this.setState({
        parentID: this.state.parentID,
        orgs: res,
        orgMap: {}
      })
      res.forEach((child: models.Org) => {
        if (child.childrenCount > 0) {
          client.orgs.list(child.id, false, (err: models.Error, res: Array<models.Org>) => {
            this.state.orgMap[child.id] = res
            this.setState({
              parentID: this.state.parentID,
              orgs: this.state.orgs,
              orgMap: this.state.orgMap
            })
          });
        }
      })
    })
  }

  render() {
    if (!this.state.orgs) return <InnerLoading />

    let isLevel = false
    this.state.orgs.forEach((org: models.Org) => {
      if (org.childrenCount > 0) {
        isLevel = true
      }
    })

    let listEl = null
    if (isLevel) {
      listEl = this.state.orgs.map((org: models.Org) => {
        const childOrgs = this.state.orgMap[org.id] || []
        const childEl = childOrgs.map((child: models.Org) => {
          if (child.childrenCount > 0) {
            return (
              <a key={child.id} onClick={(e) => {this.state.parentID = child.id; this.setState(this.state); this.load()}} href="javascript:;" className="m2fm_a">
                {child.orgName}
              </a>
            )
          } else {
            return (
              <Link key={child.id} to={links.INDEX + "?orgID=" + child.id} className="m2fm_a">
                {child.orgName}
              </Link>
            )
          }
        })
        return (
          <div key={org.id}>
            <div className="m2fm_t1">
              <Link key={org.id} to={links.INDEX + "?orgID=" + org.id}>
                {org.orgName}
              </Link>
            </div>
            <div className="m2fm_alink">
              {childEl}
              <div className="clear"></div>
            </div>
          </div>
        )
      })
    } else {
      const childEl = this.state.orgs.map((org: models.Org) => {
        return (
          <Link key={org.id} to={links.INDEX + "?orgID=" + org.id} className="m2fm_a">
            {org.orgName}
          </Link>
        )
      })
      listEl = (
        <div>
          <div className="m2fm_t1">
            <Link key={this.props.orgState.org.id} to={links.INDEX + "?orgID=" + this.props.orgState.org.id}>
              {this.props.orgState.org.orgName}
            </Link>
          </div>
          <div className="m2fm_alink">
            {childEl}
            <div className="clear"></div>
          </div>
        </div>
      )
    }

    return (
      <div>
        {listEl}
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
)(OrgsJGPage);
