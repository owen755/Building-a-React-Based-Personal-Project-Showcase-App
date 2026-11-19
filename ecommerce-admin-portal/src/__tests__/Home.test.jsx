import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

describe('Home Page & Navigation', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders landing page content and navigation links', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(screen.getByRole('heading', { name: /e-commerce admin portal/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^products$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^add product$/i })).toBeInTheDocument();
  });

  test('navigates from Home to Products catalog', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('link', { name: /view products/i }));
    expect(await screen.findByRole('heading', { name: /product catalog/i })).toBeInTheDocument();
  });
});