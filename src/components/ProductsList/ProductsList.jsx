import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProductItem from "../ProductItem/ProductItem";
import ProductForm from "../ProductForm/ProductForm";
import products from "../../data/products.json";
import "./ProductsList.css";

class ProductsList extends Component {
  state = {
    products: products.map(product => ({
      ...product,
      quantity: 0
    })),
    showForm: false
  }

  calculateSubtotal = (product) => {
    return product.quantity > 0
      ? product.quantity * product.price
      : 0
  }

  calculateTotal = () => {
    return this.state.products.reduce((total, product) => total + this.calculateSubtotal(product), 0)
  }

  onDelete = (productId) => {
    this.setState({ products: this.state.products.filter(product => product.id !== productId) })
  }

  onChangeQuantity = (id, quantity) => {
    if (quantity < 0) {
      return
    }

    const newProductsState = [...this.state.products];

    // encontrar el indice en el array de productos a modificar su quantity
    const productToModifyIndex = newProductsState.findIndex(product => product.id === id)
    newProductsState[productToModifyIndex].quantity = quantity;

    this.setState({ products: newProductsState })
  }

  toggleShowForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }))
  }

  onAddItem = (product) => {
    this.setState({ products: [
      ...this.state.products,
      {
        ...product,
        id: uuidv4(),
        quantity: 0
      }
    ] })
  }

  render() {
    return (
      <div className="ProductsList">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <ProductItem
                {...product}
                key={product.id}
                subtotal={this.calculateSubtotal(product)}
                onDelete={this.onDelete}
                onChange={this.onChangeQuantity}
              />
            ))}
          </tbody>

        </table>

        <p>Total: ${this.calculateTotal()}</p>

        <button onClick={this.toggleShowForm}>Show form</button>

        {
          this.state.showForm
            && (
              <ProductForm onAddProduct={this.onAddItem} />
            )
        }
      </div>
    )
  }
}

export default ProductsList;