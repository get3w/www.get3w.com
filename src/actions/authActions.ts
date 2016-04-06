import * as types from '../constants/actionTypes';
import * as models from "../api/models"
import client from "../lib/client"
import * as utils from "../lib/utils"
import * as states from '../constants/states'

export function login(authState: states.AuthState) {
  utils.Auth.cacheAuthState(authState)
  return { type: types.AUTH_LOGIN, authState };
}

export function logout() {
  utils.Auth.removeCache()
  return { type: types.AUTH_LOGOUT };
}

export function updateUser(user: models.User) {
  const authState = utils.Auth.getAuthState()
  authState.user = user
  utils.Auth.cacheAuthState(authState)
  return { type: types.AUTH_UPDATE_USER, user };
}
