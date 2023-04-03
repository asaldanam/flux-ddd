import { CartItem } from "modules/Cart/domain/CartItem";
import { CartStore } from "../CartStore";

export function incrementCartItemCount(draft: typeof CartStore['state'], cartItem: CartItem) {
  draft.cart = draft.cart.map(item =>
    item.productId === cartItem.productId
      ? { ...item, units: item.units + cartItem.units }
      : item
  )

  console.log(draft, cartItem.units)
}

