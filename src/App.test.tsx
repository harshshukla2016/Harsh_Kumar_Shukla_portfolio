import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';

// Simple unit test to validate the core "Career Engine" context
describe('Harsh OS Infrastructure', () => {
  it('Initializes the Portfolio Provider correctly', () => {
    render(
      <PortfolioProvider>
        <div data-testid="test-child">Systems Active</div>
      </PortfolioProvider>
    );
    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.getByText('Systems Active')).toBeDefined();
  });
});
