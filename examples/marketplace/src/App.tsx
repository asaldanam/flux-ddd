import { CartProvider } from "modules/Cart/infraestructure/cartContext";
import { Backoffice } from "views/Backoffice/Backoffice";
import { Shop } from "views/Shop/Shop";
import { localStorageProductsRepository } from "./modules/Products/infraestructure/localStorageProductsRepository";
import { ProductsProvider } from "./modules/Products/infraestructure/productsContext";

function App() {
  return (
    <div>
      <ProductsProvider products={localStorageProductsRepository}>
        <CartProvider>
          <div>
            <Shop />
            <Backoffice />
          </div>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
