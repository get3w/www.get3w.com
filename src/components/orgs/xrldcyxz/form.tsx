import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  org: models.Org
  orgLeader: models.OrgLeader
  orgLeaderUserNames: Array<string>
  onClose: (isReload: boolean) => void
}

interface S {
  orgLeader: models.OrgLeader
  positions: Array<models.Position>
  users: Array<models.User>
  isPosition: boolean
}

export default class HJXJXZ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgLeader: this.props.orgLeader || new models.OrgLeader(),
      positions: null,
      users: null,
      isPosition: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.load(nextProps.org.orgType, nextProps.org.id)
  }

  componentDidMount() {
    this.load(this.props.org.orgType, this.props.org.id)
  }

  load(orgType: string, orgID: number) {
    utils.DOM.loading(true)
    let orgleadertt = this.props.orgLeader;
    if (!orgleadertt) {
      orgleadertt = new models.OrgLeader()
      orgleadertt.periodNum = 1;
      client.orgLeaders.getLatestLeader(orgID, (err: models.Error, res: models.OrgLeader) => {
        utils.DOM.loading(false)
        if (res) {
          if (res.isCurrent)
            orgleadertt.periodNum = res.periodNum;
          else
            orgleadertt.periodNum = res.periodNum + 1;
        }
        client.positions.list(orgType, (err: models.Error, res: Array<models.Position>) => {
          utils.DOM.loading(false)
          this.setState({
            orgLeader: orgleadertt,
            users: null,
            positions: res,
            isPosition: false
          })
        })
      })
    }
  }

  onChange(name: string, e) {
    this.state.orgLeader[name] = e.target.value
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    if (this.props.orgLeader) {
      client.orgLeaders.edit(this.state.orgLeader, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose(true)
        } else {
          utils.Swal.error(err)
        }
      })
    } else {
      this.state.orgLeader.orgID = this.props.org.id
      this.state.orgLeader.orgName = this.props.org.orgName
      this.state.orgLeader.isCurrent = true
      client.orgLeaders.create(this.state.orgLeader, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.onClose(true)
        } else {
          utils.Swal.error(err)
        }
      })
    }
  }

  onRadioClick(user: models.User, e) {
    this.state.orgLeader.userName = user.userName
    this.state.orgLeader.displayName = user.displayName
    this.state.users = null
    this.setState(this.state);
  }

  onPositionClick(position: models.Position, e) {
    this.state.orgLeader.positionID = position.id
    this.state.orgLeader.positionTitle = position.title
    this.state.isPosition = false
    this.setState(this.state);
  }

  onSearch(e: React.MouseEvent) {
    utils.DOM.prevent(e)
    utils.DOM.loading(true)
    
  }

  render() {
    const orgLeader = this.state.orgLeader
    const title = this.props.orgLeader ? '修改领导成员' : '新增领导成员'

    let usersEl = null
    if (this.state.users) {
      let listEl = null
      if (this.state.users.length > 0) {
        listEl = []
        this.state.users.forEach((user: models.User) => {
          if (this.props.orgLeaderUserNames.indexOf(user.userName) !== -1) return
          listEl.push(
            <li key={user.id}>
              <input onClick={this.onRadioClick.bind(this, user) } className="lay-rad" name="a" type="radio" value="" />
              {user.displayName}
            </li>
          )
        })
      } else {
        listEl = <div>无搜索结果</div>
      }
      usersEl = (
        <div className="m2fmLayer" style={{ top: 270 }}>
          <div className="m2fm_srcBox">
            <ul>
              {listEl}
            </ul>
          </div>
        </div>
      )
    }

    let addEl = null
    if (this.state.orgLeader.userName) {
      addEl = <a onClick={this.onSubmit.bind(this) } href="javascript:;" className="m2btn_a1">确 定</a>
    }

    let positionsEl = null
    if (this.state.positions && this.state.positions.length > 0) {
      positionsEl = this.state.positions.map((position: models.Position) => {
        return <dd key={position.id} onClick={this.onPositionClick.bind(this, position) }>{position.title}</dd>
      })
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1" style={{ width: 518, height: "360px", marginLeft: '-259px', marginTop: '-170px' }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) } />
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: 28 }}>
            <ul>
              <li><span className="lay_s1">排 序</span>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left' }}>
                  <input type="text" value={orgLeader.taxis ? orgLeader.taxis.toString() : ''} onChange={this.onChange.bind(this, "taxis") } className="m2fm_int" />
                </div>
              </li>
              <li><span className="lay_s1">届 数</span>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left' }}>
                  <input type="text" value={orgLeader.periodNum ? orgLeader.periodNum.toString() : ''} onChange={this.onChange.bind(this, "periodNum") } className="m2fm_int" />
                </div>
              </li>
              <li><span className="lay_s1">党内职务</span>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left' }}>
                  <input value={orgLeader.positionTitle} onClick={(e) => { this.state.isPosition = !this.state.isPosition; this.setState(this.state) } } type="text" className="m2fm_int m2fm_int3" placeholder="请选择" />
                  <div className="m2fm_selBox" style={{ display: this.state.isPosition ? 'block' : 'none' }}>
                    <dl>
                      {positionsEl}
                    </dl>
                  </div>
                </div>
              </li>
              <li><span className="lay_s1">姓 名</span>
                <div className="m2fm_selContent" style={{ position: 'relative', paddingRight: 1, float: 'left' }}>
                  <input type="text" value={orgLeader.displayName} onChange={this.onChange.bind(this, "displayName") } className="m2fm_int" />
                  <input onClick={this.onSearch.bind(this) } type="submit" name="" className="m2submit" value="" style={{ marginLeft: "5px", float: 'right' }} />
                </div>
              </li>
            </ul>
          </div>
          {usersEl}
          <div className="m2btnBox2">
            {addEl}
            <a onClick={this.props.onClose.bind(this) } href="javascript:;" className="m2btn_a2">取 消</a>
          </div>
        </div>
      </div>
    )
  }
}
