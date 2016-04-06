import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class UserWorks {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(userWork: models.UserWork, cb?: (err: models.Error, res: models.UserWork) => void) {
    this.request.post('/user_works', userWork, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/user_works/' + id, null, cb)
  }

  edit(userWork: models.UserWork, cb?: (err: models.Error, res: models.UserWork) => void) {
    this.request.put('/user_works/' + userWork.id, userWork, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.UserWork) => void) {
    this.request.get('/user_works/' + id, null, cb)
  }

  list(userName: string, cb?: (err: models.Error, res: Array<models.UserWork>) => void) {
    this.request.get('/user_works', {
      userName: userName
    }, cb)
  }
}
