// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const blockchainsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Blockchains', additionalProperties: true }
)
export const blockchainsValidator = getValidator(blockchainsSchema, dataValidator)
export const blockchainsResolver = resolve({})

export const blockchainsExternalResolver = resolve({})

// Schema for creating new entries
export const blockchainsDataSchema = Type.Pick(blockchainsSchema, ['text'], {
  $id: 'BlockchainsData'
})
export const blockchainsDataValidator = getValidator(blockchainsDataSchema, dataValidator)
export const blockchainsDataResolver = resolve({})

// Schema for updating existing entries
export const blockchainsPatchSchema = Type.Partial(blockchainsSchema, {
  $id: 'BlockchainsPatch'
})
export const blockchainsPatchValidator = getValidator(blockchainsPatchSchema, dataValidator)
export const blockchainsPatchResolver = resolve({})

// Schema for allowed query properties
export const blockchainsQueryProperties = Type.Pick(blockchainsSchema, ['_id', 'text'])
export const blockchainsQuerySchema = Type.Intersect(
  [
    querySyntax(blockchainsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const blockchainsQueryValidator = getValidator(blockchainsQuerySchema, queryValidator)
export const blockchainsQueryResolver = resolve({})
