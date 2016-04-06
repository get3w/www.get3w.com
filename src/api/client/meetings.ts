import * as http from '../http'
import * as models from '../models'

export default class Meetings {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(meeting: models.Meeting, cb?: (err: models.Error, res: models.Meeting) => void) {
    this.request.post('/meetings', meeting, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/meetings/' + id, null, cb)
  }

  edit(meeting: models.Meeting, cb?: (err: models.Error, res: models.Meeting) => void) {
    this.request.put('/meetings/' + meeting.id, meeting, cb)
  }

  get(id: number, cb?: (err: models.Error, res: models.Meeting) => void) {
    this.request.get('/meetings/' + id, null, cb)
  }

  list(orgID: number, meetingTypeID: number, cb?: (err: models.Error, res: Array<models.Meeting>) => void) {
    this.request.get('/meetings', {
      orgID: orgID,
      meetingTypeID: meetingTypeID,
    }, cb)
  }

  searchByKeyword(orgID: number, meetingTypeID: number, keyword: string, from: string, to: string, cb?: (err: models.Error, res: Array<models.Meeting>) => void) {
    this.request.post('/meetings/actions/search', {
      orgID, meetingTypeID, keyword, from, to
    }, cb)
  }

  searchByIDs(meetingIDs: string, cb?: (err: models.Error, res: Array<models.Meeting>) => void) {
    this.request.post('/meetings/actions/search_by_ids', {
      meetingIDs
    }, cb)
  }
}
