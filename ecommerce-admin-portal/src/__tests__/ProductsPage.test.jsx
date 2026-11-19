import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

const mockProducts = [
  {
    id: '1',
    name: 'Coffee Maker',
    description: 'Programmable 12-cup drip coffee maker.',
    origin: 'Kenya',
    price: 79.99,
    category: 'Appliances',
    image: 'https://example.com/coffee.jpg',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones.',
    origin: 'Japan',
    price: 149.99,
    category: 'Electronics',
    image: 'https://example.com/headphones.jpg',
  },
];

describe('ProductsPage (Read, Search, Delete)', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn((url, options) => {
      if (options?.method === 'DELETE') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('displays fetched products and filters dynamically by search', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText('Coffee Maker')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search by name or category/i);
    await user.type(searchInput, 'Coffee');

    expect(screen.getByText('Coffee Maker')).toBeInTheDocument();
    expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  test('deletes a product and removes it from the UI', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText('Coffee Maker')).toBeInTheDocument();
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products/1',
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument();
  });
});