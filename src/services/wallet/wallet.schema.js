// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const walletSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    // text: Type.String()
  },
  { $id: 'Wallet', additionalProperties: true }
)
export const walletValidator = getValidator(walletSchema, dataValidator)
export const walletResolver = resolve({})

export const walletExternalResolver = resolve({})

// Schema for creating new entries
export const walletDataSchema = Type.Pick(walletSchema, ['text'], {
  $id: 'WalletData'
})
export const walletDataValidator = getValidator(walletDataSchema, dataValidator)
export const walletDataResolver = resolve({})

// Schema for updating existing entries
export const walletPatchSchema = Type.Partial(walletSchema, {
  $id: 'WalletPatch'
})
export const walletPatchValidator = getValidator(walletPatchSchema, dataValidator)
export const walletPatchResolver = resolve({})

// Schema for allowed query properties
export const walletQueryProperties = Type.Pick(walletSchema, ['_id', 'text'])
export const walletQuerySchema = Type.Intersect(
  [
    querySyntax(walletQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const walletQueryValidator = getValidator(walletQuerySchema, queryValidator)
export const walletQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  user_id: async (value, user, context) => {
    if (context.params.user
      //  && context.params.user.role != "admin"
       ) {
      return context.params.user._id
    }

    return value
  }
})
