import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class UserEducations {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(userEducation: models.UserEducation, cb?: (err: models.Error, res: models.UserEducation) => void) {
    this.request.post('/user_educations', userEducation, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/user_educations/' + id, null, cb)
  }

  edit(userEducation: models.UserEducation, cb?: (err: models.Error, res: models.UserEducation) => void) {
    this.request.put('/user_educations/' + userEducation.id, userEducation, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.UserEducation) => void) {
    this.request.get('/user_educations/' + id, null, cb)
  }

  list(userName: string, cb?: (err: models.Error, res: Array<models.UserEducation>) => void) {
    this.request.get('/user_educations', {
      userName: userName
    }, cb)
  }
}
