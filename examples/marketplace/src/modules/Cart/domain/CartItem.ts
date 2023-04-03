import { Optional } from "typescript/utils";

// Entities
export interface CartItem {
  productId: string;
  units: number;
}

// Derived types
export type NewCartItem = Optional<CartItem, 'units'>;

// Entity creators
export function createCartItem(newCartItem: NewCartItem): CartItem {
  if (newCartItem.units && newCartItem.units <= 0)
    throw new Error('invalid-count')

  return {
    units: 1,
    ...newCartItem,
  }
}