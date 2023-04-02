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

    setAll: (state, products: Product[]) => produce(state, draft => {
      draft.products = products
      draft.meta.loading = false;
    }),
    
    // Meta
    setError: (state, error: string) => produce(state, draft => {
      draft.meta.error = error;
    }) ,
    setLoading: (state, loading: boolean) => produce(state, draft => {
      draft.meta.loading
    })
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
        
        dispatch('add', product);
        await repositories.products.save(product);
      } catch(error: any) {
        dispatch('setError', error)
      }
    }
  }),
})