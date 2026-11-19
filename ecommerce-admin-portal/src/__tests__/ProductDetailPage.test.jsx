import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

const mockProduct = {
  id: '1',
  name: 'Coffee Maker',
  description: 'Programmable 12-cup drip coffee maker.',
  origin: 'Kenya',
  price: 79.99,
  category: 'Appliances',
  image: 'https://example.com/coffee.jpg',
};

describe('ProductDetailPage (PATCH Update & DELETE)', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn((url, options) => {
      if (options?.method === 'PATCH') {
        const updates = JSON.parse(options.body);
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...mockProduct, ...updates }),
        });
      }
      if (options?.method === 'DELETE') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct]),
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('updates product price via PATCH request', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: 'Coffee Maker' })).toBeInTheDocument();

    const priceInput = screen.getByLabelText(/price/i);
    fireEvent.change(priceInput, { target: { value: '95.50' } });
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products/1',
      expect.objectContaining({ method: 'PATCH' })
    );
    expect(await screen.findByText(/product updated!/i)).toBeInTheDocument();
    expect(screen.getByText(/current price: \$95\.50/i)).toBeInTheDocument();
  });

  test('deletes product from detail page and redirects to catalog', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: 'Coffee Maker' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /delete product/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products/1',
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(await screen.findByRole('heading', { name: /product catalog/i })).toBeInTheDocument();
  });
});