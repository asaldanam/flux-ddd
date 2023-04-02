import { Optional } from "typescript/utils";

// Entities
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

// Derived types
export type NewProduct = Optional<Product, 'id'>;

// Value objects
export const productNameMaxLength = 32;

// Entity handlers
export function createProduct(newProduct: NewProduct, products: Product[]): Product {
  if (newProduct.name.length > productNameMaxLength)
    throw new Error('name-max-length')

  if (products.some(product => product.name === newProduct.name))
    throw new Error('product-already-exists')
  
  if (typeof newProduct.price !== 'number' || isNaN(newProduct.price))
    throw new Error('price-is-not-a-number')
  
  return {
    id: newProduct.id || new Date().getTime().toString(),
    ...newProduct,
  }
}

