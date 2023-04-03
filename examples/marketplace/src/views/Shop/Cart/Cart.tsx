import { useCart } from "modules/Cart/infraestructure/cartContext";

export interface CartProps {}

export const Cart = () => {
  const { state: { cart }, actions: { addItemToCart, removeItemFromCart } } = useCart();

  return (
    <>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Product</th>
            <th style={{ textAlign: 'left' }}>Units</th>
            <th style={{ textAlign: 'left' }}></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td>{item.units}</td>
              <td>
                <button onClick={() => addItemToCart(item.productId)}>Add more</button>
                <button onClick={() => removeItemFromCart(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
