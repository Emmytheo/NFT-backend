import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const testMail = async (context) => {
  console.log(`Running hook testMail on ${context.path}.${context.method}`)

  const presets = {
    to: 'chidi.mgbara@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Feathers.js!',
    from: '',
    transport: {
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'zephsproject@gmail.com', // Your email address
        pass: 'fvzdqbrsngmtqjwv' // Your email password
      }
    }
  }

  switch (context.path) {
    case "mail":
      presets.from = 'zephsproject@gmail.com';
    case "webhook":
      presets.from = 'zephsproject@gmail.com';
    case "verification":
      presets.from = 'zephsproject@gmail.com';
    default:
      presets.from = 'zephsproject@gmail.com';
  }

  // Configure your SMTP transport
  const transporter = nodemailer.createTransport(
    smtpTransport(presets.transport)
  )

  
  try {
    const { to, subject, text } = context.data
    const mailOptions = {
      from: presets.from,
      to: to || presets.to,
      subject: subject || presets.subject,
      text: text || presets.text
    }

    // Send the email
    const response = await transporter.sendMail(mailOptions)
    context.data = {
      ...context.data,
      ...response
    }
  } catch (error) {
    throw new Error('Email sending failed')
  }
}
