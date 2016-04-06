import * as models from '../api/models';

export interface AllState {
  authState: AuthState
  orgState: OrgState
}

export interface AuthState {
  token: string
  user: models.User
  isAnonymous: boolean

  orgs?: Array<models.Org>
  orgLeaders?: Array<models.OrgLeader>
  orgAdmins?: Array<models.OrgAdmin>
}

export interface OrgState {
  org: models.Org
  isAdmin: boolean
  isLeader: boolean
  isOp: boolean
  title: string
}
