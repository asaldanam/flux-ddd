import { createSlice } from "flux-ddd";
import produce from "immer";
import { CartItem, createCartItem } from "../domain/CartItem";
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
    cartItemRemoved: (state, cartItem: CartItem) => produce(state, draft => {
      draft.cart = draft.cart.filter(item => item.productId !== cartItem.productId);
    }),
    errorSetted: (state, error: string) => produce(state, draft => {
      draft.meta.error = error;
    })
  },
  actions: (dispatch) => ({
    async addItemToCart(productId: CartItem['productId']) {
      try {
        const cartItem = createCartItem({ productId });

        dispatch('cartItemAdded', cartItem);
      } catch (error: any) {
        dispatch('errorSetted', (error as Error).message)
      }
    },
    async removeItemFromCart(productId: CartItem['productId']) {
      try {
        const cartItem = createCartItem({ productId });

        dispatch('cartItemRemoved', cartItem);
      } catch (error: any) {
        dispatch('errorSetted', (error as Error).message)
      }
    }
  }),
  externalEvents(event, actions) {
    console.log(event )
    if (event.slice === 'Products' && event.type === 'removed') {
      actions.removeItemFromCart(event.payload)
    }
  }
})