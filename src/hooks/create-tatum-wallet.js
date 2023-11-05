import { TatumApi } from '../tatumApi.js'
const apiKey = 't-652536d1b1499c0020538171-48ca5802eb1141db991e3eaa'
const tatumApi = new TatumApi(apiKey)

export const createTatumWallet = async (context) => {
  console.log(`Running hook createTatumWallet on ${context.path}.${context.method}`)
  let user = context.params.user || await context.app.service('users').find({ query: {email: context.data?.email} })
  user = context.params.user ? user : user.data[0]
  const wallet = user && user._id ? await context.app.service('wallet').find({ query: {user_id: user._id} }) : null
  const chain =
    wallet.data[0] && wallet.data[0].virtAcc
      ? null
      : await context.app.service('blockchains').find({ query: {blockchain: user && user.blockchain ? user.blockchain : 'ethereum' }})
  const newVirtAcc =
    chain && chain.data[0] && chain.data[0].xpub
      ? await tatumApi.genVirtAcc({
          currency: 'ETH',
          xpub: chain.data[0].xpub
        })
      : null
  const newDepAddr = await tatumApi.genVirtAccDepositAddress(newVirtAcc.id)
  const final = await context.app.service('wallet').create({
    user_id: user._id,
    virtAcc: newVirtAcc,
    depAddrs: newDepAddr
  })
  await context.app.service('users').patch(user._id, {wallet_id: final._id})
  // console.log(final)
}
