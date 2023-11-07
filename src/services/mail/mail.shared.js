export const mailPath = 'mail'

export const mailMethods = ['find', 'get', 'create', 'patch', 'remove']

export const mailClient = (client) => {
  const connection = client.get('connection')

  client.use(mailPath, connection.service(mailPath), {
    methods: mailMethods
  })
}
