// https://github.com/michael/github

import * as models from './models'
import * as http from './http'
import User from './client/user'
import Users from './client/users'
import Apps from './client/apps'
import Private from './client/private'
import Search from './client/search'

export class API {
  request: http.WebRequest
  user: User
  users: Users
  apps: Apps
  search: Search
  _private: Private

  constructor(public options: models.Options) {
    this.request = new http.WebRequest()

    var apiRequest = new http.APIRequest(options)
    this.user = new User(apiRequest)
    this.users = new Users(apiRequest)
    this.apps = new Apps(apiRequest)
    this.search = new Search(apiRequest)
    this._private = new Private(apiRequest)
  }
}
