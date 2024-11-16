const cron = require('node-cron');
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rbrahinets2002@gmail.com',
    pass: 'carjemgfbiuoaezq',
  }
});

const createMessage = (fullName) => {
  return '<h1>Hey!</h1><h2>Tomorrow is birthday of ' + fullName + '!</h2>';
}

const createEmailOptions = (email, fullName) => {
  return {
    from: '"Birthday Reminder" rbrahinets2002@gmail.com',
    to: email,
    subject: 'Birthday Reminding',
    html: createMessage(fullName),
  }
}

const setEmailNotification = (email, fullName, day, month) => {
  cron.schedule(
    `0 12 ${month} ${day} *`,
    transport.sendMail(createEmailOptions(email, fullName))
      .then(() => console.log('Email successfully sent'))
      .catch(err => console.error(err)),
    {timezone: 'Europe/Kyiv'}
  );
}

module.exports = {
  setEmailNotification
};
