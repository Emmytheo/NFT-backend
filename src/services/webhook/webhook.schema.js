// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const webhookSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Webhook', additionalProperties: true }
)
export const webhookValidator = getValidator(webhookSchema, dataValidator)
export const webhookResolver = resolve({})

export const webhookExternalResolver = resolve({})

// Schema for creating new entries
export const webhookDataSchema = Type.Pick(webhookSchema, ['text'], {
  $id: 'WebhookData'
})
export const webhookDataValidator = getValidator(webhookDataSchema, dataValidator)
export const webhookDataResolver = resolve({})

// Schema for updating existing entries
export const webhookPatchSchema = Type.Partial(webhookSchema, {
  $id: 'WebhookPatch'
})
export const webhookPatchValidator = getValidator(webhookPatchSchema, dataValidator)
export const webhookPatchResolver = resolve({})

// Schema for allowed query properties
export const webhookQueryProperties = Type.Pick(webhookSchema, ['_id', 'text'])
export const webhookQuerySchema = Type.Intersect(
  [
    querySyntax(webhookQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const webhookQueryValidator = getValidator(webhookQuerySchema, queryValidator)
export const webhookQueryResolver = resolve({})
