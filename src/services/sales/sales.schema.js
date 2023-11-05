// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const salesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Sales', additionalProperties: true }
)
export const salesValidator = getValidator(salesSchema, dataValidator)
export const salesResolver = resolve({})

export const salesExternalResolver = resolve({})

// Schema for creating new entries
export const salesDataSchema = Type.Pick(salesSchema, ['text'], {
  $id: 'SalesData'
})
export const salesDataValidator = getValidator(salesDataSchema, dataValidator)
export const salesDataResolver = resolve({})

// Schema for updating existing entries
export const salesPatchSchema = Type.Partial(salesSchema, {
  $id: 'SalesPatch'
})
export const salesPatchValidator = getValidator(salesPatchSchema, dataValidator)
export const salesPatchResolver = resolve({})

// Schema for allowed query properties
export const salesQueryProperties = Type.Pick(salesSchema, ['_id', 'text'])
export const salesQuerySchema = Type.Intersect(
  [
    querySyntax(salesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const salesQueryValidator = getValidator(salesQuerySchema, queryValidator)
export const salesQueryResolver = resolve({})
