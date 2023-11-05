// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  walletDataValidator,
  walletPatchValidator,
  walletQueryValidator,
  walletResolver,
  walletExternalResolver,
  walletDataResolver,
  walletPatchResolver,
  walletQueryResolver
} from './wallet.schema.js'
import { WalletService, getOptions } from './wallet.class.js'
import { walletPath, walletMethods } from './wallet.shared.js'

export * from './wallet.class.js'
export * from './wallet.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const wallet = (app) => {
  // Register our service on the Feathers application
  app.use(walletPath, new WalletService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: walletMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(walletPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(walletExternalResolver),
        schemaHooks.resolveResult(walletResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(walletQueryValidator), schemaHooks.resolveQuery(walletQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(walletDataValidator), schemaHooks.resolveData(walletDataResolver)],
      patch: [schemaHooks.validateData(walletPatchValidator), schemaHooks.resolveData(walletPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
