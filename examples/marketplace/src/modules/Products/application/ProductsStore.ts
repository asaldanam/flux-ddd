import { createSlice } from "flux-ddd";
import produce from "immer";
import { createProduct, NewProduct, Product } from "../domain/Product";
import { ProductsRepository } from "../domain/ProductsRepository";

interface Repositories {
  products: ProductsRepository
}

export const ProductsStore = createSlice({
  name: 'Products',
  state: {
    products: [] as Product[],
    meta: {
      loading: false,
      error: null as string | null
    }
  },
  reducers: {
    add: (state, product: Product) => produce(state, draft => {
      draft.products.push(product);
      draft.meta.loading = false;
    }),

    remove: (state, id: Product['id']) => produce(state, draft => {
      draft.products = draft.products.filter(product => product.id !== id);
      draft.meta.loading = false;
    }),

    setAll: (state, products: Product[]) => produce(state, draft => {
      draft.products = products
      draft.meta.loading = false;
    }),
    
    // Meta
    setLoading: (state, loading: boolean) => produce(state, draft => {
      draft.meta.loading = loading;
    }),
    setError: (state, error: string) => produce(state, draft => {
      draft.meta.error = error;
      draft.meta.loading = false;
    }) ,
  },
  actions: (dispatch, repositories: Repositories) => ({
    async loadAllProducts() {
      try {
        dispatch('setLoading', true);
        const products = await repositories.products.getAll();

        dispatch('setAll', products);
      } catch (error: any) {
        dispatch('setError', error)
      }
    },
    async addNewProduct(newProduct: NewProduct) {
      try {
        dispatch('setLoading', true);
        const products = await repositories.products.getAll();
        const product = createProduct(newProduct, products)
        
        await repositories.products.save(product);
        dispatch('add', product);
      } catch(error: any) {
        dispatch('setError', (error as Error).message)
      }
    },
    async removeProduct(id: Product['id']) {
      try {
        dispatch('setLoading', true);

        await repositories.products.remove(id);
        dispatch('remove', id);
      } catch (error: any) {
        dispatch('setError', (error as Error).message)
      }
    }
  }),
})