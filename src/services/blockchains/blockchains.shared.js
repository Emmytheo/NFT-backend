export const blockchainsPath = 'blockchains'

export const blockchainsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const blockchainsClient = (client) => {
  const connection = client.get('connection')

  client.use(blockchainsPath, connection.service(blockchainsPath), {
    methods: blockchainsMethods
  })
}
