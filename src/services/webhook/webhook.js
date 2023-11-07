// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  webhookDataValidator,
  webhookPatchValidator,
  webhookQueryValidator,
  webhookResolver,
  webhookExternalResolver,
  webhookDataResolver,
  webhookPatchResolver,
  webhookQueryResolver
} from './webhook.schema.js'
import { WebhookService, getOptions } from './webhook.class.js'
import { webhookPath, webhookMethods } from './webhook.shared.js'
import { testMail } from '../../hooks/test-mail.js'

export * from './webhook.class.js'
export * from './webhook.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const webhook = (app) => {
  // Register our service on the Feathers application
  app.use(webhookPath, new WebhookService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webhookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webhookPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(webhookExternalResolver), schemaHooks.resolveResult(webhookResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(webhookQueryValidator), schemaHooks.resolveQuery(webhookQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(webhookDataValidator), schemaHooks.resolveData(webhookDataResolver), testMail],
      patch: [schemaHooks.validateData(webhookPatchValidator), schemaHooks.resolveData(webhookPatchResolver)],
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
