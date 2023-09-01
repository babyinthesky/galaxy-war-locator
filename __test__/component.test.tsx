import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '../src/app/components/MainPage';
import ReduxProvider from '@/app/Provider';
import '@testing-library/jest-dom';
import { mockNetWorkResponse } from '@/testUtils/test.data';
// import preloadAll from 'jest-next-dynamic';

describe('App', () => {
  beforeAll(() => {
    mockNetWorkResponse();
  });

  it('renders main page with one title and one grid list container', async () => {
    render(<ReduxProvider><MainPage /></ReduxProvider>);

    await waitFor(() => {
      expect(screen.getByText('Star Wars - Rebellion: Locator')).toBeDefined;
      expect(screen.getByRole('grid')).toBeDefined;
    })
  });

  it('renders 2 member card', async () => {
    render(<ReduxProvider><MainPage /></ReduxProvider>);

    await waitFor(() => {
      expect(screen.getByText('Star Wars - Rebellion: Locator')).toBeDefined;
      expect(screen.getAllByRole('gridcell').length).toEqual(2);
    })
  });

  // it('renders map container', async () => {
  //   render(<ReduxProvider><MainPage /></ReduxProvider>);

  //   await waitFor(() => {
  //     // expect(screen.getByRole('mapcontainer')).toBeDefined;
  //   })
  // });
});