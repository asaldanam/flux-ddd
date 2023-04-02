import { useProducts } from "modules/Products/infraestructure/productsContext";
import { FormEvent, useEffect } from "react";

export const ProductsTable = () => {
  const { state: { products, meta }, actions } = useProducts();

  useEffect(() => {
    actions.loadAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    await actions.addNewProduct({
      name: data.name as string,
      category: data.category as string,
      price: parseInt(data.price as string),
    })
  }

  console.log(meta)

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
                <td></td>
              </tr>
            ))}
            <tr>
              <td><input name="name" placeholder="name" /></td>
              <td><input name="category" placeholder="category" /></td>
              <td><input name="price" placeholder="price" /></td>
              <td><button type="submit">Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      {/* <div>{meta.error}</div> */}
    </div>
  );
};

