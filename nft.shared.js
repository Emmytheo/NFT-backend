export const nftPath = 'nft'

export const nftMethods = ['find', 'get', 'create', 'patch', 'remove']

export const nftClient = (client) => {
  const connection = client.get('connection')

  client.use(nftPath, connection.service(nftPath), {
    methods: nftMethods
  })
}
