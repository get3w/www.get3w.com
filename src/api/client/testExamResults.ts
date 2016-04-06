import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestExamResults {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(result: models.TestExamResult, cb?: (err: models.Error, res: models.TestExamResult) => void) {
    this.request.post('/test_exam_results', result, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_exam_results/' + id, null, cb)
  }

  edit(result: models.TestExamResult, cb?: (err: models.Error, res: models.TestExamResult) => void) {
    this.request.put('/test_exam_results/' + result.id, result, cb)
  }

  get(id: number, cb?: (err: models.Error, res: models.TestExamResult) => void) {
    this.request.get('/test_exam_results/' + id, null, cb)
  }

  list(taskID: number, examID: number, solutionID: number, cb?: (err: models.Error, res: Array<models.TestExamResult>) => void) {
    this.request.get('/test_exam_results', {
      taskID, examID, solutionID
    }, cb)
  }
}
