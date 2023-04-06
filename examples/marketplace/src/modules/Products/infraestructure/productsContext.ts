import { createContextAdapter } from "flux-ddd";
import { ProductsStore } from "../application/ProductsStore";

const productsContext = createContextAdapter(ProductsStore)

export const ProductsProvider = productsContext.Provider;
export const useProducts = productsContext.useContext;