import { Product } from "./Product";

export interface ProductsRepository {
  getAll(): Promise<Product[]>
  save(product: Product): Promise<void>
}