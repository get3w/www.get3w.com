import * as types from '../constants/actionTypes';
import * as models from "../api/models"
import client from "../lib/client"
import * as utils from "../lib/utils"
import * as states from '../constants/states'

export function orgChange(orgState: states.OrgState) {
  return { type: types.ORG_CHANGE, orgState };
}
