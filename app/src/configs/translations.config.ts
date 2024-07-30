/**
 * Translation configuration
 */

import { appName } from './app.config';

// Translations
export const translations = {
  en: {
    app: {
      appName: appName,
    },
    email: {
      action: 'Complete registration',
      passwordReset: 'Password reset',
    },
  },
};

export default translations;
