import { Dashboard } from "views/Dashboard/Dashboard";
import { localStorageProductsRepository } from "./modules/Products/infraestructure/localStorageProductsRepository";
import { ProductsProvider } from "./modules/Products/infraestructure/productsContext";

function App() {
  return (
    <div>
      <ProductsProvider products={localStorageProductsRepository}>
        <Dashboard />
      </ProductsProvider>
    </div>
  );
}

export default App;
