import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestTasks {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(task: models.TestTask, orgIDs: Array<string>, cb?: (err: models.Error, res: models.TestTask) => void) {
    this.request.post('/test_tasks', _.assign({}, task, {
      orgIDs: orgIDs.join(',')
    }), cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_tasks/' + id, null, cb)
  }

  edit(task: models.TestTask, orgIDs: Array<string>, cb?: (err: models.Error, res: models.TestTask) => void) {
    this.request.put('/test_tasks/' + task.id, _.assign({}, task, {
      orgIDs: orgIDs.join(',')
    }), cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestTask) => void) {
    this.request.get('/test_tasks/' + id, null, cb)
  }

  search(isEnd: boolean, orgID: number, solutionID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<models.TestTask>) => void) {
    this.request.post('/test_tasks/actions/search', {
      isEnd,
      orgID,
      solutionID,
      startDate,
      endDate
    }, cb)
  }
}
