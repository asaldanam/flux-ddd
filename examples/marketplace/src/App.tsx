import { EventManagerProvider } from "flux-ddd/react/eventManager";
import { CartProvider } from "modules/Cart/infraestructure/cartContext";
import { Backoffice } from "views/Backoffice/Backoffice";
import { Shop } from "views/Shop/Shop";
import { localStorageProductsRepository } from "./modules/Products/infraestructure/localStorageProductsRepository";
import { ProductsProvider } from "./modules/Products/infraestructure/productsContext";

function App() {
  return (
    <div>
      <EventManagerProvider>
        <ProductsProvider products={localStorageProductsRepository}>
          <CartProvider>
            <div>
              <Shop />
              <Backoffice />
            </div>
          </CartProvider>
        </ProductsProvider>
      </EventManagerProvider>
    </div>
  );
}

export default App;
