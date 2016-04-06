import * as api from '../api/api'
import release from './release'

class Client extends api.API {
  constructor(){
    super({
        api: release.domainAPI,
    })
  }

  setToken(token: string) {
    this.options.token = token
  }
}

var client = new Client()
export default client
