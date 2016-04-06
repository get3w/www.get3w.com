import * as http from '../http'
import * as models from '../models'

export default class Analysis {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  FemaleMinorityAgeEducation(analysisType: string, orgID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<{
    orgID: number
    orgName: string
    female: number
    minority: number
    age1: number
    age2: number
    age3: number
    education1: number
    education2: number
    education3: number
    education4: number
    education5: number
    education6: number
    total: number
  }>) => void) {
    this.request.get('/analysis/female_minority_age_education', {
      analysisType, orgID, startDate, endDate
    }, cb)
  }

  ProbationaryState(orgID: number, cb?: (err: models.Error, res: Array<{
    orgID: number
    orgName: string
    state1: number
    state2: number
    state3: number
    state4: number
    total: number
  }>) => void) {
    this.request.get('/analysis/probationary_state', {
      orgID
    }, cb)
  }

  PartyMemberChange(orgID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<{
    orgID: number
    orgName: string
    startTotal: number
    increase1: number
    increase2: number
    decrease1: number
    decrease2: number
    decrease3: number
    endTotal: number
  }>) => void) {
    this.request.get('/analysis/party_member_change', {
      orgID, startDate, endDate
    }, cb)
  }

  Orgs(orgID: number, startDate: string, endDate: string, cb?: (err: models.Error, res: Array<{
    orgID: number
    orgName: string
    org1: number
    org2: number
    org3: number
    org4: number
    total: number
  }>) => void) {
    this.request.get('/analysis/orgs', {
      orgID, startDate, endDate
    }, cb)
  }

  PartyMembers(analysisType: string, orgID: number, cb?: (err: models.Error, res: Array<{
    orgID: number
    orgName: string
    count1: number
    count2: number
    count3: number
    count4: number
    count5: number
    count6: number
    count7: number
    total: number
  }>) => void) {
    this.request.get('/analysis/party_members', {
      analysisType, orgID
    }, cb)
  }
}
