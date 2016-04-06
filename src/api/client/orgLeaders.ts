import * as http from '../http'
import * as models from '../models'

export default class OrgLeaders {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(orgLeader: models.OrgLeader, cb?: (err: models.Error, res: models.OrgLeader) => void) {
    this.request.post('/org_leaders', orgLeader, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/org_leaders/' + id, null, cb)
  }

  edit(orgLeader: models.OrgLeader, cb?: (err: models.Error, res: models.OrgLeader) => void) {
    this.request.put('/org_leaders/' + orgLeader.id, orgLeader, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.OrgLeader) => void) {
    this.request.get('/org_leaders/' + id, null, cb)
  }

  getLatestLeader(orgID: number, cb?: (err: models.Error, res: models.OrgLeader) => void) {
    this.request.get('/org_leader_orgid/' + orgID, null, cb)
  }

  list(orgID: number, isCurrent: boolean, displayName: string, periodNum: number, cb?: (err: models.Error, res: Array<models.OrgLeader>) => void) {
    this.request.get('/org_leaders', {
      orgID, isCurrent, displayName, periodNum
    }, cb)
  }

  search(parentID: number, orgLeaderName: string, isCancel: string, orgLeaderType: string, cb?: (err: models.Error, res: Array<models.OrgLeader>) => void) {
    this.request.post('/org_leaders/actions/search', {
      parentID, orgLeaderName, isCancel, orgLeaderType
    }, cb)
  }

  searchByUserName(userName: string, cb?: (err: models.Error, res: Array<models.OrgLeader>) => void) {
    this.request.post('/org_leaders/actions/search_by_user_name', {
      userName
    }, cb)
  }

  updateIsCurrent(orgID: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/org_leaders/actions/update_is_current', {
      orgID
    }, cb)
  }
}
