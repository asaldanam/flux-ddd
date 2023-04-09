import { Thunk } from "flux-toolkit";
import { NewProduct, createProduct } from "modules/Products/domain/Product";
import { ProductsStore } from "modules/Products/domain/ProductsStore";

export const addNewProduct = (newProduct: NewProduct): Thunk<ProductsStore> => async (store, repositories) => {
    try {
      store.dispatch('loadingStarted', null);
      const products = await repositories.products.getAll();
      const product = createProduct(newProduct, products)
      
      await repositories.products.save(product);
      store.dispatch('added', { product });
    } catch(error: any) {
      store.dispatch('errorSetted', { error: (error as Error).message })
    }
}