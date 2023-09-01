import * as React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../src/app/components/MainPage';
import ReduxProvider from '@/app/Provider';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@/testUtils/testUtils';
import { getMemberListResponse, mockNetWorkResponse } from '@/testUtils/test.data';

describe('App', () => {
  beforeAll(() => {
    mockNetWorkResponse();
  });
  it('renders member card', async () => {
    renderWithProviders(<ReduxProvider><MainPage /></ReduxProvider>);

    expect(screen.getByText('Star Wars - Rebellion: Locator')).toBeDefined;
  });
});