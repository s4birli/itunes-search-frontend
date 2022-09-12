import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { store } from './store';

const rootElement = document.getElementById('root');
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

export const createRenderWrapper = (store: EnhancedStore) => {
  const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            {children}
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };

  return (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options });
};

const customRender = createRenderWrapper(store);

export * from '@testing-library/react';
export { customRender as render };
