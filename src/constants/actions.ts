import * as models from '../api/models';
import * as states from '../constants/states'

export interface AllActions {
  authActions: AuthActions
  orgActions: OrgActions
}

export interface AuthActions {
  login: (authState: states.AuthState) => any
  logout: () => any
  updateUser: (user: models.User) => any
}

export interface OrgActions {
  orgChange: (orgState: states.OrgState) => any
}
