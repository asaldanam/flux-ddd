import { useCart } from "modules/Cart/infraestructure/cartContext";
import { useProducts } from "modules/Products/infraestructure/productsContext";
import { FormEvent, useEffect } from "react";

interface ProductsTableProps {
  editable?: boolean;
}

export const ProductsTable = ({ editable }: ProductsTableProps) => {
  const { state: { products, meta }, actions } = useProducts();
  const { actions: { addItemToCart } } = useCart();

  useEffect(() => {
    actions.loadAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addProduct = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form as HTMLFormElement);
    const data = Object.fromEntries(formData);

    await actions.addNewProduct({
      name: data.name as string,
      category: data.category as string,
      price: parseInt(data.price as string),
    })

    form.reset();
  }

  const deleteProduct = (id: string) => {
    actions.removeProduct(id)
  }

  return (
    <div>
      <h4>{'<ProductsTable />'}</h4>
      <form onSubmit={addProduct}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'left' }}>Category</th>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                  <td>
                  {editable
                    ? <button onClick={() => deleteProduct(product.id)}>Remove</button>
                    : <button onClick={() => addItemToCart(product.id)}>Buy</button>
                  }
                  </td>
              </tr>
            ))}
            {editable && (
              <tr>
                <td><input name="name" placeholder="Name" /></td>
                <td><input name="category" placeholder="Category" /></td>
                <td><input name="price" type="number" placeholder="Price" /></td>
                <td><button type="submit">Create</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </form>

      <small><pre>{JSON.stringify(meta, null, 2)}</pre></small>
    </div>
  );
};

