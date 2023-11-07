// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { mailClient } from './services/mail/mail.shared.js'

import { blockchainsClient } from './services/blockchains/blockchains.shared.js'

import { webhookClient } from './services/webhook/webhook.shared.js'

import { verificationClient } from './services/verification/verification.shared.js'

import { nftClient } from './services/nft/nft.shared.js'

import { salesClient } from './services/sales/sales.shared.js'

import { transactionClient } from './services/transaction/transaction.shared.js'

import { walletClient } from './services/wallet/wallet.shared.js'

import { userClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the arteslux-backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(walletClient)

  client.configure(transactionClient)

  client.configure(salesClient)

  client.configure(nftClient)

  client.configure(verificationClient)

  client.configure(webhookClient)

  client.configure(blockchainsClient)

  client.configure(mailClient)

  return client
}
