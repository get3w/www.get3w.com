import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class Historys {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(history: models.History, cb?: (err: models.Error, res: models.History) => void) {
    this.request.post('/histories', history, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/histories/' + id, null, cb)
  }

  edit(history: models.History, cb?: (err: models.Error, res: models.History) => void) {
    this.request.put('/histories/' + history.id, history, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.History) => void) {
    this.request.get('/histories/' + id, null, cb)
  }

  list(userName: string, cb?: (err: models.Error, res: Array<models.History>) => void) {
    this.request.get('/histories', {
      userName
    }, cb)
  }
}
