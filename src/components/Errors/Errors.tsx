import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Grow, { GrowProps } from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { store, getUnreadErrors, IError, readErrors } from '../../store';
import { ErrorsProps } from './Errors.types';

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Search: FC<ErrorsProps> = () => {
  const [ unreadErrors, setUnreadErrors ] = useState<IError[]>();
  store.subscribe(() => {
    setUnreadErrors(getUnreadErrors(store.getState()));
  });

  useEffect(() => {
    if (unreadErrors && unreadErrors.length > 0) {
      setTimeout(() => store.dispatch(readErrors(unreadErrors)), 5000);
    }
  }, [ unreadErrors ]);
  return (
    <>
      {unreadErrors &&
        unreadErrors.length > 0 &&
        unreadErrors.map((error) => (
          <Snackbar
            key={error.id}
            open={true}
            autoHideDuration={5000}
            TransitionComponent={GrowTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              {error.message}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default Search;
