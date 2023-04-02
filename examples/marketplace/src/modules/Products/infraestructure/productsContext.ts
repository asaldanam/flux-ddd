import { createContextAdapter } from "flux-ddd/react";
import { ProductsStore } from "../application/ProductsStore";

const productsContext = createContextAdapter(ProductsStore)

export const ProductsProvider = productsContext.Provider;
export const useProducts = productsContext.useContext;