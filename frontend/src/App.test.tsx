import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders homepage', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getAllByText(/Login/i)[0]).toBeInTheDocument();
});
