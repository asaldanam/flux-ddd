import { createSlice } from "flux-ddd";
import produce from "immer";
import { CartItem, createCartItem, NewCartItem } from "../domain/CartItem";
import { addCartItem } from "./usecases/addCartItem";
import { incrementCartItemCount } from "./usecases/incrementCartItemCount";

export const CartStore = createSlice({
  name: 'Cart',
  state: {
    cart: [] as CartItem[],
    meta: {
      error: null as string | null,
    }
  },
  reducers: {
    cartItemAdded: (state, cartItem: CartItem) => produce(state, draft => {
      const itemAlreadyAdded = draft.cart.some(product => product.productId === cartItem.productId);
      
      if (itemAlreadyAdded) {
        incrementCartItemCount(draft, cartItem);
        return;
      }
      
      addCartItem(draft, cartItem);
    }),
    errorSetted: (state, error: string) => produce(state, draft => {
      draft.meta.error = error;
    })
  },
  actions: (dispatch) => ({
    async addItemToCart(newCartItem: NewCartItem) {
      try {
        const cartItem = createCartItem(newCartItem);

        dispatch('cartItemAdded', cartItem);
      } catch (error: any) {
        dispatch('errorSetted', (error as Error).message)
      }
    }
  })
})

