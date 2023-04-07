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
    added: (state, product: Product) => produce(state, draft => {
      draft.products.push(product);
      draft.meta.loading = false;
    }),

    removed: (state, id: Product['id']) => produce(state, draft => {
      draft.products = draft.products.filter(product => product.id !== id);
      draft.meta.loading = false;
    }),

    allSetted: (state, products: Product[]) => produce(state, draft => {
      draft.products = products
      draft.meta.loading = false;
    }),
    
    // Meta
    loadingStarted: (state) => produce(state, draft => {
      draft.meta.loading = true;
    }),
    errorSetted: (state, error: string) => produce(state, draft => {
      draft.meta.error = error;
      draft.meta.loading = false;
    }),
  },
  actions: (state, dispatch, repositories: Repositories) => ({
    async loadAllProducts() {
      try {
        dispatch('loadingStarted', undefined);
        const products = await repositories.products.getAll();

        dispatch('allSetted', products);
      } catch (error: any) {
        dispatch('errorSetted', error)
      }
    },
    async addNewProduct(newProduct: NewProduct) {
      try {
        dispatch('loadingStarted', undefined);
        const products = await repositories.products.getAll();
        const product = createProduct(newProduct, products)
        
        await repositories.products.save(product);
        dispatch('added', product);
      } catch(error: any) {
        dispatch('errorSetted', (error as Error).message)
      }
    },
    async removeProduct(id: Product['id']) {
      try {
        dispatch('loadingStarted', undefined);
        
        await repositories.products.remove(id);
        dispatch('removed', id);
      } catch (error: any) {
        dispatch('errorSetted', (error as Error).message)
      }
    }
  }),
})
