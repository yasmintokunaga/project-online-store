import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import BtnAdd from './BtnAdd';
import './SearchField.css';

// import ShoppingCart from './ShoppingCart';
export default class SearchField extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      queryInput: '',
      productList: [],
      findItem: true,
      API: '',
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
    this.handleCLick = this.handleCLick.bind(this);
  }

  async componentDidMount() {
    this.setState({ categories: await getCategories() });
  }

  handleCLick() {
    const { history } = this.props;
    history.push('/shoppingcart');
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      async () => {
        const { API } = this.state;
        if (API.length > 0) {
          const resultsCategories = await getProductsFromCategoryAndQuery(API);
          this.setState({
            productList: resultsCategories.results,
            findItem: resultsCategories.results.length > 0,
          });
        }
      },
    );
  };

  enableBtn = async () => {
    const { queryInput } = this.state;
    const queryResult = await getProductsFromCategoryAndQuery('', queryInput);
    this.setState({
      productList: queryResult.results,
      findItem: queryResult.results.length > 0,
    });
  };

  addCart = (product) => {
    const { cart } = this.state;
    const itens = cart.find((item) => item.id === product.id);
    if (itens) {
      itens.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
  };

  /* selectCategories = (event) => {
    console.log(event.target); */
  /* }; */

  /* goToCategoriesProducts = (id) => {
    const { history } = this.props;
    history.push(`/CategoriesProducts/${id}`);
  }; */

  render() {
    const { categories, queryInput, productList, findItem } = this.state;
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

        <p
          data-testid="home-initial-message"
          className="title is-size-5 m-5 has-text-centered"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <fieldset className="field has-addons is-flex is-justify-content-center">
          <div className="control has-icons-left has-icons-right ml-6">
            <input
              className="input"
              data-testid="query-input"
              name="queryInput"
              onChange={ this.handleChange }
              value={ queryInput }
            />
            <span className="icon is-left">
              <i className="fas fa-magnifying-glass" />
            </span>
          </div>
          <button
            className="button is-light"
            data-testid="query-button"
            type="button"
            onClick={ this.enableBtn }
          >
            Pesquisar
          </button>
        </fieldset>

        <main className="columns mt-6">
          <section className="search-items">

            <fieldset>
              <div className="size-list is-flex is-flex-direction-column box ml-6">
                {categories.map(({ id, name }) => (
                  <label htmlFor="API" key={ id } className="mb-2">
                    <input
                      data-testid="category"
                      type="radio"
                      name="API"
                      id="API"
                      value={ id }
                      onClick={ this.handleChange }
                      className="mr-2"
                    />
                    {name}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section
            className="list-items is-flex is-flex-wrap-wrap is-align-content-flex-start"
          >
            {findItem && productList.map((product) => (
              <div
                className={
                  `${'card size-card ml-5 mb-5 '}
                    ${'is-flex is-flex-direction-column '}
                    ${'is-justify-content-space-between'}`
                }
                data-testid="product"
                key={ product.id }
              >
                <Link
                  to={ `/products/${product.id}` }
                  data-testid="product-detail-link"
                  key={ product.id }
                  className="is-flex is-flex-direction-column is-align-items-center"
                >
                  <figure className="image is-128x128">
                    <img src={ product.thumbnail } alt={ product.title } />
                  </figure>
                  <p className="is-size-7 m-2 has-text-centered">{product.title}</p>
                </Link>
                <p className="has-text-centered">
                  R$
                  {product.price.toFixed(2)}
                </p>
                <BtnAdd addCart={ () => this.addCart(product) } />
              </div>
            ))}
            {!findItem && <h2>Nenhum produto foi encontrado</h2>}
          </section>
        </main>
      </>
    );
  }
}

SearchField.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
