import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnAdd extends Component {
  render() {
    const { addCart } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ addCart }
          className="button is-success"
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

BtnAdd.propTypes = {
  addCart: PropTypes.func.isRequired,
};
