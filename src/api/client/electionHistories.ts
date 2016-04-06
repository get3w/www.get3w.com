import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class ElectionHistories {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(eh: models.ElectionHistory, cb?: (err: models.Error, res: models.ElectionHistory) => void) {
    this.request.post('/election_histories', eh, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/election_histories/' + id, null, cb)
  }

  edit(eh: models.ElectionHistory, cb?: (err: models.Error, res: models.ElectionHistory) => void) {
    this.request.put('/election_histories/' + eh.id, eh, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.ElectionHistory) => void) {
    this.request.get('/election_histories/' + id, null, cb)
  }

  list(orgID: number, periodNum: number, cb?: (err: models.Error, res: Array<models.ElectionHistory>) => void) {
    this.request.get('/election_histories', {
      orgID, periodNum
    }, cb)
  }
}
