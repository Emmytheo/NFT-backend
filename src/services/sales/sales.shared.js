export const salesPath = 'sales'

export const salesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const salesClient = (client) => {
  const connection = client.get('connection')

  client.use(salesPath, connection.service(salesPath), {
    methods: salesMethods
  })
}
