// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const transactionSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Transaction', additionalProperties: true }
)
export const transactionValidator = getValidator(transactionSchema, dataValidator)
export const transactionResolver = resolve({})

export const transactionExternalResolver = resolve({})

// Schema for creating new entries
export const transactionDataSchema = Type.Pick(transactionSchema, ['text'], {
  $id: 'TransactionData'
})
export const transactionDataValidator = getValidator(transactionDataSchema, dataValidator)
export const transactionDataResolver = resolve({})

// Schema for updating existing entries
export const transactionPatchSchema = Type.Partial(transactionSchema, {
  $id: 'TransactionPatch'
})
export const transactionPatchValidator = getValidator(transactionPatchSchema, dataValidator)
export const transactionPatchResolver = resolve({})

// Schema for allowed query properties
export const transactionQueryProperties = Type.Pick(transactionSchema, ['_id', 'text'])
export const transactionQuerySchema = Type.Intersect(
  [
    querySyntax(transactionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const transactionQueryValidator = getValidator(transactionQuerySchema, queryValidator)
export const transactionQueryResolver = resolve({})
