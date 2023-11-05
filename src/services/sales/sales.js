// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  salesDataValidator,
  salesPatchValidator,
  salesQueryValidator,
  salesResolver,
  salesExternalResolver,
  salesDataResolver,
  salesPatchResolver,
  salesQueryResolver
} from './sales.schema.js'
import { SalesService, getOptions } from './sales.class.js'
import { salesPath, salesMethods } from './sales.shared.js'

export * from './sales.class.js'
export * from './sales.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const sales = (app) => {
  // Register our service on the Feathers application
  app.use(salesPath, new SalesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: salesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(salesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(salesExternalResolver),
        schemaHooks.resolveResult(salesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(salesQueryValidator), schemaHooks.resolveQuery(salesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(salesDataValidator), schemaHooks.resolveData(salesDataResolver)],
      patch: [schemaHooks.validateData(salesPatchValidator), schemaHooks.resolveData(salesPatchResolver)],
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
