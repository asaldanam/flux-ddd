import { createContextAdapter } from "flux-ddd/react";
import { eventManager } from "modules/shared/EventManager/infraestructure/eventManager";
import { CartStore } from "../application/CartStore";

const cartContext = createContextAdapter(CartStore, { eventManager });

export const CartProvider = cartContext.Provider;
export const useCart = cartContext.useContext;