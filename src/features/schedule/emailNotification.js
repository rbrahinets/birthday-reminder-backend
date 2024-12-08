const cron = require('node-cron')
const nodemailer = require('nodemailer')
const { findBirthdays } = require('../../services/birthdayService')

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rbrahinets2002@gmail.com',
    pass: 'carjemgfbiuoaezq',
  },
})

const createMessage = (fullName) => {
  return '<h1>Привіт, друже!</h1><h2>Не забудь, що завтра день народження у ' + fullName + '!</h2>'
}

const createEmailOptions = (email, fullName) => {
  return {
    from: '"Birthday Reminder" rbrahinets2002@gmail.com',
    to: email,
    subject: 'Birthday Reminding',
    html: createMessage(fullName),
  }
}

const sendEmailNotification = async (email, fullName) => {
  await transport.sendMail(createEmailOptions(email, fullName))
}

const scheduleEmailNotification = async (birthday) => {
  const dateOfBirth = birthday.dateOfBirth.toISOString().split('T')[0].split('-')

  const email = birthday.emailOfUser
  const fullName = `${birthday.firstName} ${birthday.lastName}`
  const day = +dateOfBirth[2] - 1
  const month = +dateOfBirth[1]

  console.log(`${+dateOfBirth[2] - 1}/${+dateOfBirth[1]}`)
  console.log(new Date())

  cron.schedule(
    `13 13 ${day} ${month} *`, async () => {
      await sendEmailNotification(email, fullName)
    },
  )
}

const scheduleTasks = async () => {
  const birthdays = await findBirthdays()

  for (const birthday of birthdays) {
    await scheduleEmailNotification(birthday)
  }
}

module.exports = {
  scheduleTasks,
  scheduleEmailNotification,
}
