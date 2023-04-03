import { CartItem } from "modules/Cart/domain/CartItem";
import { CartStore } from "../CartStore";

export function addCartItem(draft: typeof CartStore['state'], cartItem: CartItem) {
  draft.cart.push(cartItem);
}