import { CartItem } from "modules/Cart/domain/CartItem";
import { CartStore } from "../CartStore";

export function incrementCartItemCount(draft: typeof CartStore['state'], cartItem: CartItem) {
  draft.cart.map(item =>
    item.productId === cartItem.productId
      ? { ...item, count: item.count + cartItem.count }
      : item
    )
}

