import { Thunk } from "flux-toolkit";
import { ProductsStore } from "modules/Products/domain/ProductsStore";

export const loadAllProducts = (): Thunk<ProductsStore> => async (store, repositories) => {
  try {
    store.dispatch('loadingStarted', null);
    const products = await repositories.products.getAll();

    store.dispatch('allSetted', { products });
  } catch (error: any) {
    store.dispatch('errorSetted', { error })
  }
}