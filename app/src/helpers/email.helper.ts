/**
 * Email sending helper
 */

import ejs from 'ejs';
import nodemailer from 'nodemailer';
import mailerConfig from '../configs/email.config';

export const mailer = nodemailer.createTransport(mailerConfig.transportConfig);

export const sendMail = (email: object) => {
  email = {
    ...email,
    from: mailerConfig.from,
  };

  mailer.sendMail(email, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendMailFromTemplate = async (template: string, to: string | string[], subject: string, data: any) => {
  if (!('title' in data)) {
    data.title = 'subject';
  }

  const htmlTemplate = await ejs.renderFile(__dirname + `/../../views/email/${template}.html.ejs`, { data: data });
  const textTemplate = await ejs.renderFile(__dirname + `/../../views/email/${template}.html.ejs`, { data: data });

  const emailData = {
    ...data,
    to,
    subject,
    html: htmlTemplate,
    text: textTemplate,
  };

  sendMail(emailData);
};
