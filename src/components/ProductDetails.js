import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import FormItem from './FormItem';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
    this.addCart = this.addCart.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const productDetails = await getProductById(match.params.id);
    // console.log(productDetails.id);
    this.setState({
      product: productDetails,
    });
  }

  async addCart() {
    const { cart, product } = this.state;
    const itens = cart.find((item) => item.id === product.id);
    if (itens) {
      itens.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
  }

  render() {
    const { product } = this.state;
    const { match: { params: { id } } } = this.props;
    const classFlexbox = 'is-flex is-justify-content-space-between is-align-items-center';
    const classIconGifts = 'fa-solid fa-gifts has-text-white-ter ';
    return (
      <>
        <nav
          className={ `navbar is-success ${classFlexbox}` }
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-item">
            <i className={ `navbar-item is-size-2 ml-5 ${classIconGifts}` } />
            <span className="title is-3 has-text-white-ter">Online Store</span>
          </div>
          <div className="navbar-item">
            <button
              data-testid="shopping-cart-button"
              className="button is-light mr-5"
              name=""
              onClick={ this.handleCLick }
            >
              <i className="fa-solid fa-cart-shopping" />
            </button>
          </div>
        </nav>

        <main
          className={
            `${'is-flex is-flex-direction-column is-justify-content-center '}
            ${'is-align-items-center m-6'}`
          }
        >
          <div
            className={
              `${'card is-flex is-flex-direction-column '}
              ${'is-justify-content-center is-align-items-center p-5 mb-6'}`
            }
          >
            <h1
              data-testid="product-detail-name"
              className="title is-5 has-text-centered"
            >
              {product.title}
            </h1>
            <div className="card-image">
              <figure className="image is-128x128">
                <img
                  data-testid="product-detail-image"
                  src={ product.thumbnail }
                  alt={ product.title }
                />
              </figure>
            </div>
            <p data-testid="product-detail-price">
              R$
              {product.price}
            </p>
            <footer className="is-flex mt-3">
              <button
                data-testid="product-detail-add-to-cart"
                onClick={ this.addCart }
                className="card-footer-item button is-success"
              >
                Adicionar ao carrinho
              </button>
              <Link
                data-testid="shopping-cart-button"
                className="card-footer-item button is-success is-outlined"
                to="/ShoppingCart"
              >
                Ir ao Carrinho
              </Link>
            </footer>
          </div>
          <FormItem id={ id } />
        </main>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
