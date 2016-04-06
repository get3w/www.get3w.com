import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class Records {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(record: models.Record, isHistory: boolean, cb?: (err: models.Error, res: models.Record) => void) {
    this.request.post('/records', _.assign({}, record, {
      isHistory: isHistory
    }), cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/records/' + id, null, cb)
  }

  edit(record: models.Record, cb?: (err: models.Error, res: models.Record) => void) {
    this.request.put('/records/' + record.id, record, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Record) => void) {
    this.request.get('/records/' + id, null, cb)
  }

  list(userName: string, cb?: (err: models.Error, res: Array<models.Record>) => void) {
    this.request.get('/records', {
      userName: userName
    }, cb)
  }

  searchByAll(orgID: number, userName: string, type1: string, happenDateFrom: string, happenDateTo: string, cb?: (err: models.Error, res: Array<models.Record>) => void) {
    this.request.post('/records/actions/search', {
      orgID,
      userName,
      type1,
      happenDateFrom,
      happenDateTo
    }, cb)
  }

  searchByMeeting(userName: string, cb?: (err: models.Error, res: Array<models.Record>) => void) {
    this.request.post('/records/actions/search_by_meeting', {
      userName,
    }, cb)
  }

  search(userName: string, type1: string, cb?: (err: models.Error, res: Array<models.Record>) => void) {
    this.request.post('/records/actions/search', {
      userName,
      type1,
    }, cb)
  }

  checkLWYBDY(userName: string, cb?: (err: models.Error, res: {
    iszscl: boolean
    isGongshi: boolean
  }) => void) {
    this.request.post('/records/actions/check_lwybdy', {
      userName,
    }, cb)
  }

  getZSCL(userName: string, cb?: (err: models.Error, res: models.Record) => void) {
    this.request.post('/records/actions/get_zscl', {
      userName,
    }, cb)
  }
}
