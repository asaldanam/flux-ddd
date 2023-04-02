import { Product } from "../domain/Product";
import { ProductsRepository } from "../domain/ProductsRepository";

const key = 'products'

export const localStorageProductsRepository: ProductsRepository = {
  async getAll() {
    const productsStr = localStorage.getItem(key)
    const products: Product[] = productsStr ? JSON.parse(productsStr) : [];

    return products;
  },
  async save(product) {
    const products = await this.getAll();
    const updatedProducts = [product, ...products];

    localStorage.setItem(key, JSON.stringify(updatedProducts))
  },
  async remove(id) {
    const products = await this.getAll();
    const updatedProducts = products.filter(p => p.id === id);
    
    localStorage.setItem(key, JSON.stringify(updatedProducts))
  }
}