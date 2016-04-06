import * as http from '../http'
import * as models from '../models'

export default class MeetingTypes {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(meetingType: models.MeetingType, cb?: (err: models.Error, res: models.MeetingType) => void) {
    this.request.post('/meeting_types', meetingType, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/meeting_types/' + id, null, cb)
  }

  edit(meetingType: models.MeetingType, cb?: (err: models.Error, res: models.MeetingType) => void) {
    this.request.put('/meeting_types/' + meetingType.id, meetingType, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.MeetingType) => void) {
    this.request.get('/meeting_types/' + id, null, cb)
  }

  listByOrgType(isOrgLife: boolean, orgType: string, cb?: (err: models.Error, res: Array<models.MeetingType>) => void) {
    this.request.get('/meeting_types', {
      isOrgLife, orgType
    }, cb)
  }

  listByParentID(isOrgLife: boolean, parentID: number, orgID: number, cb?: (err: models.Error, res: Array<models.MeetingType>) => void) {
    this.request.get('/meeting_types', {
      isOrgLife, parentID, orgID
    }, cb)
  }

  searchNav(isOrgLife: boolean, orgType: string, cb?: (err: models.Error, res: Array<models.MeetingType>) => void) {
    this.request.post('/meeting_types/actions/search_nav', {
      isOrgLife, orgType
    }, cb)
  }
}
