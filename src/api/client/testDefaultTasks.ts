import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestDefaultTasks {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(task: models.TestDefaultTask, orgIDs: Array<string>, cb?: (err: models.Error, res: models.TestDefaultTask) => void) {
    this.request.post('/test_default_tasks', _.assign({}, task, {
      orgIDs: orgIDs.join(',')
    }), cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_default_tasks/' + id, null, cb)
  }

  end(defaultTaskID: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/test_default_tasks/actions/end', {
      defaultTaskID
    }, cb)
  }

  edit(task: models.TestDefaultTask, orgIDs: Array<string>, cb?: (err: models.Error, res: models.TestDefaultTask) => void) {
    this.request.put('/test_default_tasks/' + task.id, _.assign({}, task, {
      orgIDs: orgIDs.join(',')
    }), cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestDefaultTask) => void) {
    this.request.get('/test_default_tasks/' + id, null, cb)
  }

  search(isEnd: boolean, solutionID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<models.TestDefaultTask>) => void) {
    this.request.post('/test_default_tasks/actions/search', {
      isEnd,
      solutionID,
      startDate,
      endDate
    }, cb)
  }
}
