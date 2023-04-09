import { Reducers } from "flux-toolkit";
import { ProductsStore } from "../domain/ProductsStore";
import produce from "immer";

export const productsReducers: Reducers<ProductsStore> = {
  added: (state, payload) => produce(state, draft => {
    draft.products.push(payload.product);
    draft.meta.loading = false;
  }),
  removed: (state, payload) => produce(state, draft => {
    draft.products = draft.products.filter(product => product.id !== payload.id);
    draft.meta.loading = false;
  }),
  allSetted: (state, payload) => produce(state, draft => {
    draft.products = payload.products
    draft.meta.loading = false;
  }),

  loadingStarted: (state) => produce(state, draft => {
    draft.meta.loading = true;
  }),
  errorSetted: (state, payload) => produce(state, draft => {
    draft.meta.error = payload.error;
    draft.meta.loading = false;
  }),
}