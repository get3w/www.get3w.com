import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class OrgActivitys {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(oa: models.OrgActivity, cb?: (err: models.Error, res: models.OrgActivity) => void) {
    this.request.post('/org_activities', oa, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/org_activities/' + id, null, cb)
  }

  edit(oa: models.OrgActivity, cb?: (err: models.Error, res: models.OrgActivity) => void) {
    this.request.put('/org_activities/' + oa.id, oa, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.OrgActivity) => void) {
    this.request.get('/org_activities/' + id, null, cb)
  }

  list(orgID: number, title: string, cb?: (err: models.Error, res: Array<models.OrgActivity>) => void) {
    this.request.get('/org_activities', {
      orgID, title
    }, cb)
  }
}
