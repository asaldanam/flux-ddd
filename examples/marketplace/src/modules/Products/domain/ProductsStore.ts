import { Store } from 'flux-toolkit'
import { Product } from './Product'
import { ProductsRepository } from './ProductsRepository'

export type ProductsStore = Store<{
  state: {
    products: Product[],
    meta: {
      loading: boolean,
      error: string | null
    }
  },
  actions: {
    added: { payload: { product: Product } },
    removed: { payload: { id: Product['id'] }},
    allSetted: { payload: { products: Product[] }},
    loadingStarted: { payload: null },
    errorSetted: { payload: { error: string | null } },
  },
  repositories: {
    products: ProductsRepository,
  }
}>