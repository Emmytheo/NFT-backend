// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  transactionDataValidator,
  transactionPatchValidator,
  transactionQueryValidator,
  transactionResolver,
  transactionExternalResolver,
  transactionDataResolver,
  transactionPatchResolver,
  transactionQueryResolver
} from './transaction.schema.js'
import { TransactionService, getOptions } from './transaction.class.js'
import { transactionPath, transactionMethods } from './transaction.shared.js'

export * from './transaction.class.js'
export * from './transaction.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const transaction = (app) => {
  // Register our service on the Feathers application
  app.use(transactionPath, new TransactionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: transactionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(transactionPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(transactionExternalResolver),
        schemaHooks.resolveResult(transactionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(transactionQueryValidator),
        schemaHooks.resolveQuery(transactionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(transactionDataValidator),
        schemaHooks.resolveData(transactionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(transactionPatchValidator),
        schemaHooks.resolveData(transactionPatchResolver)
      ],
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
