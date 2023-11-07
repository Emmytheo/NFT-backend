// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const mailSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Mail', additionalProperties: true }
)
export const mailValidator = getValidator(mailSchema, dataValidator)
export const mailResolver = resolve({})

export const mailExternalResolver = resolve({})

// Schema for creating new entries
export const mailDataSchema = Type.Pick(mailSchema, ['text'], {
  $id: 'MailData'
})
export const mailDataValidator = getValidator(mailDataSchema, dataValidator)
export const mailDataResolver = resolve({})

// Schema for updating existing entries
export const mailPatchSchema = Type.Partial(mailSchema, {
  $id: 'MailPatch'
})
export const mailPatchValidator = getValidator(mailPatchSchema, dataValidator)
export const mailPatchResolver = resolve({})

// Schema for allowed query properties
export const mailQueryProperties = Type.Pick(mailSchema, ['_id', 'text'])
export const mailQuerySchema = Type.Intersect(
  [
    querySyntax(mailQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const mailQueryValidator = getValidator(mailQuerySchema, queryValidator)
export const mailQueryResolver = resolve({})
