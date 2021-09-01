import React, { Component } from "react";

const initialState = {
  name: "",
  price: 0,
  search: "sal"
}

class ProductForm extends Component {
  state = {...initialState}

  // onChangeName = (event) => {
  //   this.setState({ name: event.target.value })
  // }

  // onChangeQuantity = (event) => {
  //   this.setState({ price: Number(event.target.value) })
  // }

  onChange = (event) => {
    const { name, value, type } = event.target

    this.setState({
      [name]: type === "number" ? Number(value) : value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.name || !this.state.price) {
      return
    }

    // llamar a la prop de añadir un item del padre
    this.props.onAddProduct(this.state);
    // resetear state
    this.setState({...initialState})
  }

  render() {
    return (
      <form className="ProductForm" onSubmit={this.onSubmit}>
        <input
          type="text" placeholder="Name of the product" name="name"
          value={this.state.name} onChange={this.onChange}
        />

        <input
          type="number" min="0" placeholder="Price per unit" name="price"
          value={this.state.price} onChange={this.onChange}
        />

        <button>Add new item</button>
      </form>
    )
  }
}

export default ProductForm;