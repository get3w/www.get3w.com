import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestSolutions {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(solution: models.TestSolution, cb?: (err: models.Error, res: models.TestSolution) => void) {
    this.request.post('/test_solutions', solution, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_solutions/' + id, null, cb)
  }

  edit(solution: models.TestSolution, cb?: (err: models.Error, res: models.TestSolution) => void) {
    this.request.put('/test_solutions/' + solution.id, solution, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestSolution) => void) {
    this.request.get('/test_solutions/' + id, null, cb)
  }

  list(cb?: (err: models.Error, res: Array<models.TestSolution>) => void) {
    this.request.get('/test_solutions', null, cb)
  }

  getSolutionNames(cb?: (err: models.Error, res: Array<string>) => void) {
    this.request.post('/test_solutions/actions/get_solution_names', null, cb)
  }

  search(solutionName: string, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<models.TestSolution>) => void) {
    this.request.post('/test_solutions/actions/search', {
      solutionName,
      startDate,
      endDate
    }, cb)
  }

  copy(solutionID: number, cb?: (err: models.Error, res: Array<models.TestSolution>) => void) {
    this.request.post('/test_solutions/actions/copy', {
      solutionID
    }, cb)
  }
}
