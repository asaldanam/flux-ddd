import { createContextAdapter } from "flux-ddd/react";
import { eventManager } from "modules/shared/EventManager/infraestructure/eventManager";
import { ProductsStore } from "../application/ProductsStore";

const productsContext = createContextAdapter(ProductsStore, { eventManager })

export const ProductsProvider = productsContext.Provider;
export const useProducts = productsContext.useContext;