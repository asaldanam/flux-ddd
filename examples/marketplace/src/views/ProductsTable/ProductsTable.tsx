import { useProducts } from "modules/Products/infraestructure/productsContext";
import { FormEvent, useEffect } from "react";

export const ProductsTable = () => {
  const { state: { products, meta }, actions } = useProducts();

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
      <div>{JSON.stringify(meta)}</div>
      <form onSubmit={addProduct}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td><button onClick={() => deleteProduct(product.id)}>Remove</button></td>
              </tr>
            ))}
            <tr>
              <td><input name="name" placeholder="Name" /></td>
              <td><input name="category" placeholder="Category" /></td>
              <td><input name="price" type="number" placeholder="Price" /></td>
              <td><button type="submit">Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      {/* <div>{meta.error}</div> */}
    </div>
  );
};

