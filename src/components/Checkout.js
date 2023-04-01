import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      cpf: '',
      email: '',
      tel: '',
      cep: '',
      address: '',
      payType: '',
      cart: [],
      validadeInput: false,
    };
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem('cart')),
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleBtnSubmit = (event) => {
    event.preventDefault();
    const { fullname, cpf, email, tel, cep, address, payType } = this.state;
    if (
      fullname.length > 0
      && cpf.length > 0
      && email.length > 0
      && tel.length > 0
      && cep.length > 0
      && address.length > 0
      && payType.length > 0
    ) {
      localStorage.clear();
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({ validadeInput: true });
    }
  };

  render() {
    const {
      fullname,
      cpf,
      email,
      tel,
      cep,
      address,
      validadeInput,
      cart,
    } = this.state;
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
          className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        >
          <section
            className={
              `${'is-flex is-flex-direction-column card card-size'}
              ${'m-6 p-5'}`
            }
          >
            <fieldset>
              <h3 className="title is-3">Revise seus Produtos</h3>
              { cart.map(({ title, index }) => (
                <p
                  key={ index }
                  className="mb-3"
                >
                  <i className="fa-solid fa-tag mr-3" />
                  { title }
                </p>
              ))}
            </fieldset>
            <hr />
            <form>
              <fieldset>
                <h4 className="title is-4">
                  Informações do Comprador
                </h4>
                <input
                  type="text"
                  name="fullname"
                  className="input m-2"
                  placeholder="Nome Completo"
                  data-testid="checkout-fullname"
                  value={ fullname }
                  onChange={ this.handleChange }
                />
                <input
                  type="text"
                  name="cpf"
                  className="input m-2"
                  placeholder="CPF"
                  data-testid="checkout-cpf"
                  value={ cpf }
                  onChange={ this.handleChange }
                />
                <input
                  type="email"
                  name="email"
                  className="input m-2"
                  placeholder="Email"
                  data-testid="checkout-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
                <input
                  type="text"
                  name="tel"
                  className="input m-2"
                  placeholder="Telefone"
                  data-testid="checkout-phone"
                  value={ tel }
                  onChange={ this.handleChange }
                />
                <input
                  type="text"
                  name="cep"
                  className="input m-2"
                  placeholder="CEP"
                  data-testid="checkout-cep"
                  value={ cep }
                  onChange={ this.handleChange }
                />
                <input
                  type="text"
                  name="address"
                  className="input m-2"
                  placeholder="Endereço"
                  data-testid="checkout-address"
                  value={ address }
                  onChange={ this.handleChange }
                />
              </fieldset>
              <hr />
              <fieldset className="control">
                <h4 className="title is-4">Método de Pagamento</h4>
                <input
                  type="radio"
                  name="payType"
                  value="boleto"
                  id="boleto"
                  data-testid="ticket-payment"
                  onClick={ this.handleChange }
                />
                <label className="radio ml-1 mr-4" htmlFor="boleto">Boleto</label>
                <input
                  type="radio"
                  name="payType"
                  value="visa"
                  id="visa"
                  data-testid="visa-payment"
                  onClick={ this.handleChange }
                />
                <label className="radio ml-1 mr-4" htmlFor="visa">Visa</label>
                <input
                  type="radio"
                  name="payType"
                  value="mastercard"
                  id="mastercard"
                  data-testid="master-payment"
                  onClick={ this.handleChange }
                />
                <label className="radio ml-1 mr-4" htmlFor="mastercard">MasterCard</label>
                <input
                  type="radio"
                  name="payType"
                  value="elo"
                  id="Elo"
                  data-testid="elo-payment"
                  onClick={ this.handleChange }
                />
                <label className="radio ml-1 mr-4" htmlFor="Elo">Elo</label>
              </fieldset>
              <footer className="card-footer mt-5">
                <button
                  data-testid="checkout-btn"
                  onClick={ this.handleBtnSubmit }
                  className="card-footer-item button is-success is-outlined"
                >
                  Comprar
                </button>
              </footer>
            </form>
            { validadeInput
              && <h3 data-testid="error-msg" className="has-text-danger">Campos inválidos</h3>}
          </section>
        </main>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
