import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class TestMetrics {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(metric: models.TestMetric, cb?: (err: models.Error, res: models.TestMetric) => void) {
    this.request.post('/test_metrics', metric, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/test_metrics/' + id, null, cb)
  }

  edit(metric: models.TestMetric, cb?: (err: models.Error, res: models.TestMetric) => void) {
    this.request.put('/test_metrics/' + metric.id, metric, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.TestMetric) => void) {
    this.request.get('/test_metrics/' + id, null, cb)
  }

  list(cb?: (err: models.Error, res: Array<models.TestMetric>) => void) {
    this.request.get('/test_metrics', null, cb)
  }

  search(typeName: string, content: string, cb?: (err: models.Error, res: Array<models.TestMetric>) => void) {
    this.request.post('/test_metrics/actions/search', {
      typeName,
      content,
    }, cb)
  }

  getTypeNames(cb?: (err: models.Error, res: Array<string>) => void) {
    this.request.post('/test_metrics/actions/get_type_names', null, cb)
  }
}
