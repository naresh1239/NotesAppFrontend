import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
 

const renderWithProviders = (ui, options=[]) =>{
    const Wrapper = ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      );
      
    return  render(
        <Wrapper>
          {ui}  
        </Wrapper>,
        ...options
      );
}

export * from '@testing-library/react';
export { renderWithProviders as render };

