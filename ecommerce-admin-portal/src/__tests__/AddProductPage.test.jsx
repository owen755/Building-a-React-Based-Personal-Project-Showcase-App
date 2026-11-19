import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

describe('AddProductPage (Create / POST)', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn((url, options) => {
      if (options?.method === 'POST') {
        const body = JSON.parse(options.body);
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: '99', ...body }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('submits a new product via POST and redirects to Products catalog', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products/new']}>
        <App />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/product name/i), 'Smart Watch');
    await user.type(screen.getByLabelText(/description/i), 'Fitness tracking watch');
    await user.type(screen.getByLabelText(/origin/i), 'South Korea');
    await user.type(screen.getByLabelText(/category/i), 'Wearables');
    await user.type(screen.getByLabelText(/price/i), '199.99');

    await user.click(screen.getByRole('button', { name: /add product/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      expect.objectContaining({ method: 'POST' })
    );

    expect(await screen.findByText('Smart Watch')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
  });
});