//import env from './environment';
//import * as Sentry from '@sentry/react'

function init() {
  //Sentry.init({ dsn: env.LOGGING });
}

function log(error: Error) {
  if (process.env.NODE_ENV === 'test') return;
  console.error('ERROR LOG', error);
  //Sentry.captureException(error)
}

export default { init, log };
