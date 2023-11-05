export const verificationPath = 'verification'

export const verificationMethods = ['find', 'get', 'create', 'patch', 'remove']

export const verificationClient = (client) => {
  const connection = client.get('connection')

  client.use(verificationPath, connection.service(verificationPath), {
    methods: verificationMethods
  })
}
