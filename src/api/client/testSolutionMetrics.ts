import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestSolutionMetrics {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(tsm: models.TestSolutionMetric, cb?: (err: models.Error, res: models.TestSolutionMetric) => void) {
    this.request.post('/test_solution_metrics', tsm, cb)
  }

  edit(tsm: models.TestSolutionMetric, cb?: (err: models.Error, res: models.TestSolutionMetric) => void) {
    this.request.put('/test_solution_metrics/' + tsm.id, tsm, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestSolutionMetric) => void) {
    this.request.get('/test_solution_metrics/' + id, null, cb)
  }

  list(solutionID: number, metricIDs: Array<number>, cb?: (err: models.Error, res: Array<models.TestSolutionMetric>) => void) {
    this.request.get('/test_solution_metrics', {
      solutionID,
      metricIDs: metricIDs ? metricIDs.join(',') : ''
    }, cb)
  }
}
