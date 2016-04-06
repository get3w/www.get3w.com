import * as http from '../http'
import * as models from '../models'

export default class Culturists {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(culturist: models.Culturist, cb?: (err: models.Error, res: models.Culturist) => void) {
    this.request.post('/culturists', culturist, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/culturists/' + id, null, cb)
  }

  edit(culturist: models.Culturist, cb?: (err: models.Error, res: models.Culturist) => void) {
    this.request.put('/culturists/' + culturist.id, culturist, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Culturist) => void) {
    this.request.get('/culturists/' + id, null, cb)
  }

  list(userName: string, isCurrent: boolean, cb?: (err: models.Error, res: Array<models.Culturist>) => void) {
    this.request.get('/culturists', {
      userName: userName,
      isCurrent: isCurrent
    }, cb)
  }
}
