// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const verificationSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Verification', additionalProperties: true }
)
export const verificationValidator = getValidator(verificationSchema, dataValidator)
export const verificationResolver = resolve({})

export const verificationExternalResolver = resolve({})

// Schema for creating new entries
export const verificationDataSchema = Type.Pick(verificationSchema, ['text'], {
  $id: 'VerificationData'
})
export const verificationDataValidator = getValidator(verificationDataSchema, dataValidator)
export const verificationDataResolver = resolve({})

// Schema for updating existing entries
export const verificationPatchSchema = Type.Partial(verificationSchema, {
  $id: 'VerificationPatch'
})
export const verificationPatchValidator = getValidator(verificationPatchSchema, dataValidator)
export const verificationPatchResolver = resolve({})

// Schema for allowed query properties
export const verificationQueryProperties = Type.Pick(verificationSchema, ['_id', 'text'])
export const verificationQuerySchema = Type.Intersect(
  [
    querySyntax(verificationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const verificationQueryValidator = getValidator(verificationQuerySchema, queryValidator)
export const verificationQueryResolver = resolve({})
