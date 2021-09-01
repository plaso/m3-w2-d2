const ProductItem = ({ id, name, price, quantity, subtotal, onDelete, onChange }) => {
  return (
    <tr className="ProductItem">
      <td>
        {name}
      </td>
      <td>
        ${price}
      </td>
      <td>
        <label htmlFor={`quantity-${id}`}>Quantity: </label>
        <input
          min="0"
          type="number"
          id={`quantity-${id}`}
          value={quantity}
          onChange={(e) => onChange(id, Number(e.target.value))}
        />
      </td>
      <td>
        ${subtotal}
      </td>
      <td>
        <button onClick={() => onDelete(id)}>Remove</button>
      </td>
    </tr>
  )
}

export default ProductItem;