import * as http from '../http'
import * as models from '../models'

export default class Introducers {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(introducer: models.Introducer, cb?: (err: models.Error, res: models.Introducer) => void) {
    this.request.post('/introducers', introducer, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/introducers/' + id, null, cb)
  }

  edit(introducer: models.Introducer, cb?: (err: models.Error, res: models.Introducer) => void) {
    this.request.put('/introducers/' + introducer.id, introducer, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Introducer) => void) {
    this.request.get('/introducers/' + id, null, cb)
  }

  list(userName: string, isCurrent: boolean, cb?: (err: models.Error, res: Array<models.Introducer>) => void) {
    this.request.get('/introducers', {
      userName: userName,
      isCurrent: isCurrent
    }, cb)
  }
}
