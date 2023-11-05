// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  verificationDataValidator,
  verificationPatchValidator,
  verificationQueryValidator,
  verificationResolver,
  verificationExternalResolver,
  verificationDataResolver,
  verificationPatchResolver,
  verificationQueryResolver
} from './verification.schema.js'
import { VerificationService, getOptions } from './verification.class.js'
import { verificationPath, verificationMethods } from './verification.shared.js'

export * from './verification.class.js'
export * from './verification.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const verification = (app) => {
  // Register our service on the Feathers application
  app.use(verificationPath, new VerificationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: verificationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(verificationPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(verificationExternalResolver),
        schemaHooks.resolveResult(verificationResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(verificationQueryValidator),
        schemaHooks.resolveQuery(verificationQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(verificationDataValidator),
        schemaHooks.resolveData(verificationDataResolver)
      ],
      patch: [
        schemaHooks.validateData(verificationPatchValidator),
        schemaHooks.resolveData(verificationPatchResolver)
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
