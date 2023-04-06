import { createContextAdapter } from "flux-ddd";
import { CartStore } from "../application/CartStore";

const cartContext = createContextAdapter(CartStore);

export const CartProvider = cartContext.Provider;
export const useCart = cartContext.useContext;