import { Middleware } from '@reduxjs/toolkit';

import logger from '../../logService';
import { errorHappened } from '../states/ErrorState';

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (action.type === errorHappened.type) {
    logger.log(action);
  }
  return next(action);
};
