import { Thunk } from "flux-toolkit";
import { Product } from "modules/Products/domain/Product";
import { ProductsStore } from "modules/Products/domain/ProductsStore";

export const removeProduct = (id: Product['id']): Thunk<ProductsStore> => async (store, repositories) => {
  try {
    store.dispatch('loadingStarted', null);
    
    await repositories.products.remove(id);
    store.dispatch('removed', { id });
  } catch (error: any) {
    store.dispatch('errorSetted', { error: (error as Error).message })
  }
}