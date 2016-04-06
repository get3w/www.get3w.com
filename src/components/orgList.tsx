import * as React from 'react'
import { browserHistory } from 'react-router'
import * as models from '../api/models'
import * as utils from '../lib/utils'
import client from '../lib/client'

interface P {
  org: models.Org
  onOrgSelect: (currentOrg: models.Org) => void
}

interface S {
  meetings: Array<models.Meeting>
  winType: string
  id: number
  searchKeyword: string
  searchFrom: string
  searchTo: string
  orgMap: { [index: number]: Array<models.Org> }
  level: number
  levelOrgMap: { [index: number]: models.Org }
  controls: { [index: string]: boolean }
}

export default class OrgList extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      meetings: null,
      winType: '',
      id: null,
      searchKeyword: '',
      searchFrom: '',
      searchTo: '',
      orgMap: {},
      controls: {},
      level: 0,
      levelOrgMap: {}
    }
  }

  componentDidMount() {
    this.state.meetings = null
    this.setState(this.state)

    if (this.state.level === 0) {
      this.onOrgClick(this.props.org, 1, true)
    }
  }

  onOrgClick(org: models.Org, level: number, select: boolean) {
    if (level === 1) this.state.controls['all'] = false
    this.state.controls["org-" + (level - 1)] = false
    if (select) {
      this.state.controls["org-" + level] = false
    } else {
      this.state.controls["org-" + level] = !this.state.controls["org-" + level]
    }
    this.state.level = level
    this.state.levelOrgMap[level] = org

    if (select) {
      let currentOrg = this.props.org
      if (this.state.level > 0) {
        currentOrg = this.state.levelOrgMap[this.state.level]
      }
      if (this.state.level > 1) {
        this.props.onOrgSelect(currentOrg)
      }
    }

    let orgs = this.state.orgMap[org.id]
    if (!orgs && org.childrenCount > 0) {
      utils.DOM.loading(true)
      client.orgs.list(org.id, false, (err: models.Error, children: Array<models.Org>) => {
        utils.DOM.loading(false)
        orgs = children
        if (children && children.length > 0) {
          this.state.orgMap[org.id] = children
          this.setState(this.state)
        }
      })
    } else {
      this.setState(this.state)
    }
  }

  getOrgListEl(org: models.Org, level: number) {
    let orgs = this.state.orgMap[org.id]
    let listEl = null
    if (orgs) {
      listEl = orgs.map((o: models.Org) => {
        return <dd key={o.id} onClick={ () => {
          this.onOrgClick(o, level + 1, true)
        } }>{o.orgName}</dd>
      })
    }

    let currentOrg = null
    if (this.state.level > level) {
      currentOrg = this.state.levelOrgMap[level + 1]
    }

    return (
      <div key={org.id} className="m2fm_selContent" style={{ float: "left", position: "relative", marginRight: "5px" }}>
        <input onClick={this.onOrgClick.bind(this, org, level, false) } value={currentOrg ? currentOrg.orgName : ''} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="选择机构" />
        <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", display: this.state.controls['org-' + level] ? "block" : "none" }}>
          <dl>
            {listEl}
          </dl>
        </div>
      </div>
    )
  }

  render() {
    const orgsEl = []
    for (let i = 1; i <= this.state.level; i++) {
      const org = this.state.levelOrgMap[i]
      if (org && org.childrenCount > 0) {
        orgsEl.push(this.getOrgListEl(org, i))
      }
    }

    return (
      <div>
        <div className="m2fm_selContent" style={{ float: "left", position: "relative", marginRight: "5px" }}>
          <input onClick={() => {
            this.state.controls['all'] = !this.state.controls['all']
            this.setState(this.state)
          } } value={this.props.org.orgName} type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="选择机构" />
          <div className="m2fm_selBox m2fm_selBox2" style={{ position: "absolute", display: this.state.controls['all'] ? "block" : "none" }}>
            <dl>
              <dd onClick={ () => {
                this.onOrgClick(this.props.org, 1, true)
              } }>{this.props.org.orgName}</dd>
            </dl>
          </div>
        </div>
        {orgsEl}
      </div>
    )
  }
}
