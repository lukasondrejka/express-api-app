/**
 * Email configuration
 */

import process from 'node:process';
import { MailOptions } from 'nodemailer/lib/json-transport';

type MailerConfig = {
  transportConfig: MailOptions;
  from: string;
  auth?: {
    user: string;
    pass: string;
  };
};

const mailerConfig: MailerConfig = {
  transportConfig: <MailOptions>{
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT ?? '0'),
  },
  auth: {
    user: process.env.EMAIL_USER || 'user',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
  from: process.env.EMAIL_FROM || '',
};

export default mailerConfig;
