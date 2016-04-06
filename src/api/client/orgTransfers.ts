import * as _ from 'lodash'
import * as http from '../http'
import * as models from '../models'

export default class OrgTransfers {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(orgTransfer: models.OrgTransfer, cb?: (err: models.Error, res: models.OrgTransfer) => void) {
    this.request.post('/org_transfers', orgTransfer, cb)
  }

  delete(id: number, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/org_transfers/' + id, null, cb)
  }

  edit(orgTransfer: models.OrgTransfer, cb?: (err: models.Error, res: models.OrgTransfer) => void) {
    this.request.put('/org_transfers/' + orgTransfer.id, orgTransfer, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.OrgTransfer) => void) {
    this.request.get('/org_transfers/' + id, null, cb)
  }

  list(sourceOrgID: number, targetOrgID: number, userName: string, cb?: (err: models.Error, res: Array<models.OrgTransfer>) => void) {
    this.request.get('/org_transfers', { sourceOrgID, targetOrgID, userName }, cb)
  }

  search(sourceOrgID: number, targetOrgID: number, displayName: string, targetOrgName: string, applyState: string, transferType: string, applyDateFrom: string, applyDateTo: string, isChildren: boolean, cb?: (err: models.Error, res: Array<models.OrgTransfer>) => void) {
    this.request.post('/org_transfers/actions/search', {
      sourceOrgID, targetOrgID, displayName, targetOrgName, applyState, transferType, applyDateFrom, applyDateTo, isChildren
    }, cb)
  }
}
