import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { EventManagerProvider } from 'flux-ddd/react/eventManager';
import { CartProvider } from 'modules/Cart/infraestructure/cartContext';
import { ProductsRepository } from 'modules/Products/domain/ProductsRepository';
import { ProductsProvider } from 'modules/Products/infraestructure/productsContext';
import { act } from 'react-dom/test-utils';
import { ProductsTable } from './ProductsTable';

describe('Given Products Table', () => {
  test('when displayed, should show the products as rows', async () => {
    await setup();

    expect(await screen.findByText(/TomateMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/HortalizaMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/166/i)).toBeInTheDocument();
  });

  test('when product added, should be displayed in the table', async () => {
    await setup();
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'PeraMock' } })
    fireEvent.change(screen.getByPlaceholderText('Category'), { target: { value: 'FrutaMock' } })
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 2 } })

    fireEvent.click(await screen.findByText('Create'))

    expect(await screen.findByText(/PeraMock/i)).toBeInTheDocument();
  });

  test('when product removed, should not be displayend in the table', async () => {
    await setup();

    expect(await screen.findByText('Remove')).toBeInTheDocument();
    fireEvent.click(await screen.findByText('Remove'));
    
    await waitForElementToBeRemoved(() => screen.queryByText(/TomateMock/i))
  })
})

async function setup() {
  const mockProductsRepository: ProductsRepository = {
    getAll: async () => [{ id: '1', category: 'HortalizaMock', name: 'TomateMock', price: 166 }],
    remove: async () => {},
    save: async () => {}
  }

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => 
    render(
      <EventManagerProvider>
        <ProductsProvider products={mockProductsRepository}>
          <CartProvider>
            <ProductsTable editable />
          </CartProvider>
        </ProductsProvider>
      </EventManagerProvider>
    )
  )
}