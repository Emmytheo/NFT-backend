export const webhookPath = 'webhook'

export const webhookMethods = ['find', 'get', 'create', 'patch', 'remove']

export const webhookClient = (client) => {
  const connection = client.get('connection')

  client.use(webhookPath, connection.service(webhookPath), {
    methods: webhookMethods
  })
}
