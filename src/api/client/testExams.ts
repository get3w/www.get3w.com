import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestExams {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(exam: models.TestExam, cb?: (err: models.Error, res: models.TestExam) => void) {
    this.request.post('/test_exams', exam, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_exams/' + id, null, cb)
  }

  edit(exam: models.TestExam, cb?: (err: models.Error, res: models.TestExam) => void) {
    this.request.put('/test_exams/' + exam.id, exam, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestExam) => void) {
    this.request.get('/test_exams/' + id, null, cb)
  }

  search(orgID: number, isEnd: boolean, solutionID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<models.TestExam>) => void) {
    this.request.post('/test_exams/actions/search', {
      orgID,
      isEnd,
      solutionID,
      startDate,
      endDate
    }, cb)
  }

  searchByUp(isEnd: boolean, upOrgID: number, selectedOrgID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<models.TestExam>) => void) {
    this.request.post('/test_exams/actions/search_by_up', {
      isEnd, upOrgID, selectedOrgID, startDate, endDate
    }, cb)
  }

  searchByTaskID(taskID: number, cb?: (err: models.Error, res: Array<models.TestExam>) => void) {
    this.request.post('/test_exams/actions/search_by_task_id', {
      taskID
    }, cb)
  }

  getLast(orgID: number, cb?: (err: models.Error, res: models.TestExam) => void) {
    this.request.post('/test_exams/actions/get_last', {
      orgID,
    }, cb)
  }
}
