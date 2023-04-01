import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const getCart = JSON.parse(localStorage.getItem('cart'));
    if (getCart) {
      this.setState({
        cart: getCart,
      });
    }
  }

  render() {
    const { cart } = this.state;
    const classFlexbox = 'is-flex is-justify-content-space-between is-align-items-center';
    const classIconGifts = 'fa-solid fa-gifts has-text-white-ter ';
    return (
      <section>
         <nav
          className={ `navbar is-success ${classFlexbox}` }
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-item">
            <i className={ `navbar-item is-size-2 ml-5 ${classIconGifts}` } />
            <span className="title is-3 has-text-white-ter">Online Store</span>
          </div>
          {/* <div className="navbar-item">
            <button
              data-testid="shopping-cart-button"
              className="button is-light mr-5"
              name=""
              onClick={ this.handleCLick }
            >
              <i className="fa-solid fa-cart-shopping" />
            </button>
          </div> */}
        </nav>
        <main
          className={
            `${'is-flex is-flex-direction-column is-justify-content-center '}
            ${'is-align-items-center m-6'}`
          }>
          <h2 class="title is-2">Carrinho</h2>
          { cart.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              cart.map((product) => (
                <div
                  key={ product.id }
                  data-testid="product"
                  className={
                    `${'card is-flex is-flex-direction-column card-size '}
                    ${'is-justify-content-center is-align-items-center p-5 mb-6'}`
                  }
                >
                  <p
                    data-testid="shopping-cart-product-name"
                    className="subtitle is-5 has-text-centered"
                  >
                    {product.title}
                  </p>
                  <figure className="image is-128x128">
                    <img
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                  </figure>
                  <p class="m-3">{`R$${product.price}`}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    Quantidade:
                    { ' ' }
                    {product.quantity}</p>
                </div>)))}
            <Link 
              to="/checkout"
              data-testid="checkout-products"
              class="button is-success"
            >
              Finalizar compra
          </Link>
        </main>
      </section>
    );
  }
}

export default ShoppingCart;
