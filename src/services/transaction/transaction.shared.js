export const transactionPath = 'transaction'

export const transactionMethods = ['find', 'get', 'create', 'patch', 'remove']

export const transactionClient = (client) => {
  const connection = client.get('connection')

  client.use(transactionPath, connection.service(transactionPath), {
    methods: transactionMethods
  })
}
