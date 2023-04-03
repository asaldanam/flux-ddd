import { ProductsTable } from "views/Dashboard/ProductsTable/ProductsTable"

export const Dashboard = () => {
  console.log('render Dashboard');
  return (
    <>
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