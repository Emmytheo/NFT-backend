// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  nftDataValidator,
  nftPatchValidator,
  nftQueryValidator,
  nftResolver,
  nftExternalResolver,
  nftDataResolver,
  nftPatchResolver,
  nftQueryResolver
} from './nft.schema.js'
import { NftService, getOptions } from './nft.class.js'
import { nftPath, nftMethods } from './nft.shared.js'

export * from './nft.class.js'
export * from './nft.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const nft = (app) => {
  // Register our service on the Feathers application
  app.use(nftPath, new NftService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: nftMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(nftPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(nftExternalResolver),
        schemaHooks.resolveResult(nftResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(nftQueryValidator), schemaHooks.resolveQuery(nftQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(nftDataValidator), schemaHooks.resolveData(nftDataResolver)],
      patch: [schemaHooks.validateData(nftPatchValidator), schemaHooks.resolveData(nftPatchResolver)],
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
