// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  mailDataValidator,
  mailPatchValidator,
  mailQueryValidator,
  mailResolver,
  mailExternalResolver,
  mailDataResolver,
  mailPatchResolver,
  mailQueryResolver
} from './mail.schema.js'
import { MailService, getOptions } from './mail.class.js'
import { mailPath, mailMethods } from './mail.shared.js'

export * from './mail.class.js'
export * from './mail.schema.js'

import { testMail } from '../../hooks/test-mail.js'


// A configure function that registers the service and its hooks via `app.configure`
export const mail = (app) => {
  // Register our service on the Feathers application
  app.use(mailPath, new MailService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mailMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(mailPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(mailExternalResolver),
        schemaHooks.resolveResult(mailResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(mailQueryValidator), schemaHooks.resolveQuery(mailQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(mailDataValidator), schemaHooks.resolveData(mailDataResolver), testMail],
      patch: [schemaHooks.validateData(mailPatchValidator), schemaHooks.resolveData(mailPatchResolver)],
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
