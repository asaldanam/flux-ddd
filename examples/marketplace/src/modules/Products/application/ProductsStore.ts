import { createStore } from "flux-toolkit";
import { loadAllProducts } from "./usecases/loadAllProducts";
import { productsReducers } from "./productsReducers";
import { addNewProduct } from "./usecases/addNewProduct";
import { removeProduct } from "./usecases/removeProduct";

export const productsStore = createStore({
  name: 'Products',
  initialState: {
    products: [],
    meta: {
      loading: false,
      error: null,
    }
  },
  reducers: productsReducers,
  thunks: {
    loadAllProducts,
    addNewProduct,
    removeProduct,
  }
})