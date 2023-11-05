// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const nftSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Nft', additionalProperties: true }
)
export const nftValidator = getValidator(nftSchema, dataValidator)
export const nftResolver = resolve({})

export const nftExternalResolver = resolve({})

// Schema for creating new entries
export const nftDataSchema = Type.Pick(nftSchema, ['text'], {
  $id: 'NftData'
})
export const nftDataValidator = getValidator(nftDataSchema, dataValidator)
export const nftDataResolver = resolve({})

// Schema for updating existing entries
export const nftPatchSchema = Type.Partial(nftSchema, {
  $id: 'NftPatch'
})
export const nftPatchValidator = getValidator(nftPatchSchema, dataValidator)
export const nftPatchResolver = resolve({})

// Schema for allowed query properties
export const nftQueryProperties = Type.Pick(nftSchema, ['_id', 'text'])
export const nftQuerySchema = Type.Intersect(
  [
    querySyntax(nftQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const nftQueryValidator = getValidator(nftQuerySchema, queryValidator)
export const nftQueryResolver = resolve({})
