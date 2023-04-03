import { ProductsTable } from "views/Shop/ProductsTable/ProductsTable"

export const Shop = () => {
  console.log('render Shop');
  return (
    <>
      <h2>Shop</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
        gap: '24px',
      }}>
        <div style={{ gridColumn: 'span 8', border: '1px dashed red' }}>
          <ProductsTable />
        </div>
        <div style={{ gridColumn: 'span 4', border: '1px dashed blue' }}>
          Cart
        </div>
        <div style={{ gridColumn: 'span 12', border: '1px dashed green' }}>
          Orders
        </div>
      </div>
    </>
  )
}