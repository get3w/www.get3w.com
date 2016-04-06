import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class Positions {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(position: models.Position, cb?: (err: models.Error, res: models.Position) => void) {
    this.request.post('/positions', position, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/positions/' + id, null, cb)
  }

  edit(position: models.Position, cb?: (err: models.Error, res: models.Position) => void) {
    this.request.put('/positions/' + position.id, position, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Position) => void) {
    this.request.get('/positions/' + id, null, cb)
  }

  list(orgType: string, cb?: (err: models.Error, res: Array<models.Position>) => void) {
    this.request.get('/positions', {
      orgType
    }, cb)
  }
}
