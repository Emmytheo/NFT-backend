import { TatumSDK, Ethereum, Network, ApiVersion } from '@tatumio/tatum'
import axios from 'axios'
import { TatumApi } from '../tatumApi.js'

const apiKey = 't-652536d1b1499c0020538171-48ca5802eb1141db991e3eaa'
const tatumApi = new TatumApi(apiKey)

// const tatum = await TatumSDK.init({
//   network: Network.ETHEREUM,
//   apiKey: {
//     v4: apiKey
//   }
// })

export const createBlockchain = async (context) => {
  const newBlockchain = await tatumApi.genBlockchain(
    context.data && context.data.blockchain && context.data.blockchain === 'ethereum'
      ? context.data.blockchain
      : 'ethereum'
  )
  console.log(`Running hook createBlockchain on ${context.path}.${context.method}`)
  // console.log(newBlockchain)

  context.data = {
    ...context.data,
    ...newBlockchain
  }
}
