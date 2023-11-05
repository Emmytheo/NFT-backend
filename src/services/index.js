import { blockchains } from './blockchains/blockchains.js'

import { webhook } from './webhook/webhook.js'

import { verification } from './verification/verification.js'

import { nft } from './nft/nft.js'

import { sales } from './sales/sales.js'

import { transaction } from './transaction/transaction.js'

import { wallet } from './wallet/wallet.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(blockchains)

  app.configure(webhook)

  app.configure(verification)

  app.configure(nft)

  app.configure(sales)

  app.configure(transaction)

  app.configure(wallet)

  app.configure(user)

  // All services will be registered here
}
