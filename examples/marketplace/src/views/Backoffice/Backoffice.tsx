import { ProductsTable } from "components/ProductsTable/ProductsTable"

export const Backoffice = () => {
  console.log('render Backoffice');
  return (
    <>
      <h2>Backoffice</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
        gap: '24px',
      }}>
        <div style={{ gridColumn: 'span 12', border: '1px dashed red' }}>
          <ProductsTable editable />
        </div>
      </div>
    </>
  )
}