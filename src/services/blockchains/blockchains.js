// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  blockchainsDataValidator,
  blockchainsPatchValidator,
  blockchainsQueryValidator,
  blockchainsResolver,
  blockchainsExternalResolver,
  blockchainsDataResolver,
  blockchainsPatchResolver,
  blockchainsQueryResolver
} from './blockchains.schema.js'
import { BlockchainsService, getOptions } from './blockchains.class.js'
import { blockchainsPath, blockchainsMethods } from './blockchains.shared.js'
import { createBlockchain } from '../../hooks/create-blockchain.js'
import { createTatumWallet } from '../../hooks/create-tatum-wallet.js'

export * from './blockchains.class.js'
export * from './blockchains.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const blockchains = (app) => {
  // Register our service on the Feathers application
  app.use(blockchainsPath, new BlockchainsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: blockchainsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(blockchainsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(blockchainsExternalResolver),
        schemaHooks.resolveResult(blockchainsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(blockchainsQueryValidator),
        schemaHooks.resolveQuery(blockchainsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(blockchainsDataValidator),
        schemaHooks.resolveData(blockchainsDataResolver),
        createBlockchain
      ],
      patch: [
        schemaHooks.validateData(blockchainsPatchValidator),
        schemaHooks.resolveData(blockchainsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
    },
    error: {
      all: []
    }
  })
}
