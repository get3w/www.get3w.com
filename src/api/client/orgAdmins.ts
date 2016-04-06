import * as http from '../http'
import * as models from '../models'

export default class OrgAdmins {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(orgAdmin: models.OrgAdmin, cb?: (err: models.Error, res: models.OrgAdmin) => void) {
    this.request.post('/org_admins', orgAdmin, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/org_admins/' + id, null, cb)
  }

  edit(orgAdmin: models.OrgAdmin, cb?: (err: models.Error, res: models.OrgAdmin) => void) {
    this.request.put('/org_admins/' + orgAdmin.id, orgAdmin, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.OrgAdmin) => void) {
    this.request.get('/org_admins/' + id, null, cb)
  }

  list(userName: string, orgID: number, cb?: (err: models.Error, res: Array<models.OrgAdmin>) => void) {
    this.request.get('/org_admins', {
      userName, orgID
    }, cb)
  }

  search(parentID: number, orgAdminName: string, isCancel: string, orgAdminType: string, cb?: (err: models.Error, res: Array<models.OrgAdmin>) => void) {
    this.request.post('/org_admins/actions/search', {
      parentID, orgAdminName, isCancel, orgAdminType
    }, cb)
  }
}
