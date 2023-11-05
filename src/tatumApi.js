export class TatumApi {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseUrl = 'https://api.tatum.io/v3/'
  }

  async sendRequest(config) {
    const url = this.baseUrl + config.url
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    }

    if (config.method === 'post' || config.method === 'put') {
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
      method: config.method,
      headers,
      body: config.data
    })

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(`Request failed with status ${response.status}`)
    }
  }

  async genBlockchain(blockchain) {
    const config = {
      method: 'get',
      url: `${blockchain}/wallet`
    }
    return this.sendRequest(config)
  }

  async listAccs() {
    const config = {
      method: 'get',
      url: 'ledger/account'
    }
    return this.sendRequest(config)
  }

  async listAccsCount() {
    const config = {
      method: 'get',
      url: 'ledger/account/count'
    }
    return this.sendRequest(config)
  }

  async listAccsByID(id) {
    const config = {
      method: 'get',
      url: `ledger/account/customer/${id}?pageSize=10`
    }
    return this.sendRequest(config)
  }

  async getAccByID(id) {
    const config = {
      method: 'get',
      url: `ledger/account/${id}`
    }
    return this.sendRequest(config)
  }

  async getAccBalByID(id) {
    const config = {
      method: 'get',
      url: `ledger/account/${id}/balance`
    }
    return this.sendRequest(config)
  }

  async genVirtAcc(data) {
    const config = {
      method: 'post',
      url: 'ledger/account',
      data: JSON.stringify(data)
    }
    return this.sendRequest(config)
  }

  async genVirtAccDepositAddress(id) {
    const config = {
      method: 'post',
      url: `offchain/account/${id}/address`
    }
    return this.sendRequest(config)
  }

  async getVirtAccDepositAddress(id) {
    const config = {
      method: 'get',
      url: `offchain/account/${id}/address`
    }
    return this.sendRequest(config)
  }

  async updateVirtAcc(id, data) {
    const config = {
      method: 'put',
      url: `ledger/account/${id}`,
      data: JSON.stringify(data)
    }
    return this.sendRequest(config)
  }

  async activateVirtAcc(id) {
    const config = {
      method: 'put',
      url: `ledger/account/${id}/activate`
    }
    return this.sendRequest(config)
  }

  async deactivateVirtAcc(id) {
    const config = {
      method: 'put',
      url: `ledger/account/${id}/deactivate`
    }
    return this.sendRequest(config)
  }

  async freezeVirtAcc(id) {
    const config = {
      method: 'put',
      url: `ledger/account/${id}/freeze`
    }
    return this.sendRequest(config)
  }

  async unfreezeVirtAcc(id) {
    const config = {
      method: 'put',
      url: `ledger/account/${id}/unfreeze`
    }
    return this.sendRequest(config)
  }
}

// export default TatumApi;