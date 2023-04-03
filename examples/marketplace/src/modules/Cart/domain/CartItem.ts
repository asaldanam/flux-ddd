import { Optional } from "typescript/utils";

// Entities
export interface CartItem {
  productId: string;
  count: number;
}

// Derived types
export type NewCartItem = Optional<CartItem, 'count'>;

// Entity creators
export function createCartItem(newCartItem: NewCartItem): CartItem {
  if (newCartItem.count && newCartItem.count <= 0)
    throw new Error('invalid-count')

  return {
    count: 1,
    ...newCartItem,
  }
}