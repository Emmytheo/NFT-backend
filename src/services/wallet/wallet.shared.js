export const walletPath = 'wallet'

export const walletMethods = ['find', 'get', 'create', 'patch', 'remove']

export const walletClient = (client) => {
  const connection = client.get('connection')

  client.use(walletPath, connection.service(walletPath), {
    methods: walletMethods
  })
}
