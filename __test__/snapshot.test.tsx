import React from 'react';
import { render } from '@testing-library/react'
import Home from '../src/app/page';
import ReduxProvider from '@/app/Provider';

test('renders homepage unchanged', () => {
  const { container } = render(<ReduxProvider><Home /></ReduxProvider>)
  expect(container).toMatchSnapshot()
})