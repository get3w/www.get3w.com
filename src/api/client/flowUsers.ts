import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class FlowUsers {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(flowUser: models.FlowUser, cb?: (err: models.Error, res: models.FlowUser) => void) {
    this.request.post('/flow_users', flowUser, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/flow_users/' + id, null, cb)
  }

  edit(flowUser: models.FlowUser, cb?: (err: models.Error, res: models.FlowUser) => void) {
    this.request.put('/flow_users/' + flowUser.id, flowUser, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.FlowUser) => void) {
    this.request.get('/flow_users/' + id, null, cb)
  }

  list(orgID: number, cb?: (err: models.Error, res: Array<models.FlowUser>) => void) {
    this.request.get('/flow_users', { orgID }, cb)
  }

  search(isCurrent: boolean, orgID: number, name: string, startDate: string, endDate: string, comeFrom: string, isChildren: boolean, cb?: (err: models.Error, res: Array<models.FlowUser>) => void) {
    this.request.post('/flow_users/actions/search', {
      isCurrent, orgID, name, startDate, endDate, comeFrom, isChildren
    }, cb)
  }
}
