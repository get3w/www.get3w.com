import * as http from '../http'
import * as models from '../models'

export default class Orgs {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(org: models.Org, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.post('/orgs', org, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/orgs/' + id, null, cb)
  }

  edit(org: models.Org, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.put('/orgs/' + org.id, org, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.get('/orgs/' + id, null, cb)
  }

  list(parentID: number, isAll: boolean, cb?: (err: models.Error, res: Array<models.Org>) => void) {
    this.request.get('/orgs', {
      parentID, isAll
    }, cb)
  }

  search(parentID: number, orgName: string, isCancel: string, orgType: string,isAll: string, cb?: (err: models.Error, res: Array<models.Org>) => void) {
    this.request.post('/orgs/actions/search', {
      parentID, orgName, isCancel, orgType,isAll
    }, cb)
  }

  searchDW(orgID: number, cb?: (err: models.Error, res: Array<models.Org>) => void) {
    this.request.post('/orgs/actions/search_dw', {
      orgID
    }, cb)
  }

  searchDFDZ(cb?: (err: models.Error, res: Array<models.Org>) => void) {
    this.request.post('/orgs/actions/search_dfdz', null, cb)
  }

  searchZhiBu(orgID: number, cb?: (err: models.Error, res: Array<models.Org>) => void) {
    this.request.post('/orgs/actions/search_zhibu', {
      orgID
    }, cb)
  }
}
