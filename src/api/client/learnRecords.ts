import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class LearnRecords {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(learnRecord: models.LearnRecord, cb?: (err: models.Error, res: models.LearnRecord) => void) {
    this.request.post('/learn_records', learnRecord, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/learn_records/' + id, null, cb)
  }

  edit(learnRecord: models.LearnRecord, cb?: (err: models.Error, res: models.LearnRecord) => void) {
    this.request.put('/learn_records/' + learnRecord.id, learnRecord, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.LearnRecord) => void) {
    this.request.get('/learn_records/' + id, null, cb)
  }

  list(userName: string, cb?: (err: models.Error, res: Array<models.LearnRecord>) => void) {
    this.request.get('/learn_records', {
      userName: userName
    }, cb)
  }
}
