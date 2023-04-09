import { storeToContextAdapter } from "flux-toolkit/react";
import { productsStore } from "../application/productsStore";


const productsContext = storeToContextAdapter(productsStore)

export const ProductsProvider = productsContext.Provider;
export const useProducts = productsContext.useContext;