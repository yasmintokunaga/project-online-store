import React from 'react';
import './FormItem.css';
import PropTypes from 'prop-types';

class FormItem extends React.Component {
  constructor() {
    super();
    this.state = {
      detailEmail: '',
      detailEvaluation: '',
      rateForm: ['', '', '', '', ''],
      rateEvaluation: ['', '', '', '', ''],
      validateForm: true,
      listEvaluations: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (localStorage.getItem(id)) {
      const list = JSON.parse(localStorage.getItem(id));
      this.setState({
        listEvaluations: list,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
    );
  };

  handleRate = (indexRate) => {
    const rateArray = ['', '', '', '', ''];
    const newRateForm = rateArray.map((_rate, index) => {
      if (index <= indexRate) {
        return 'checked';
      }
      return '';
    });
    this.setState({
      rateForm: newRateForm,
    });
  };

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const { detailEmail, detailEvaluation, rateForm } = this.state;
    const validate = detailEmail.length > 0
      && detailEmail.split('').includes('@')
      && detailEmail.split('').includes('.')
      && rateForm.includes('checked');
    if (!validate) {
      this.setState({ validateForm: false });
      return;
    }

    const editRate = rateForm.filter((element) => element === 'checked').length;

    const saveEvaluation = {
      email: detailEmail,
      text: detailEvaluation,
      rating: editRate,
    };
    this.setState((prevState) => ({
      listEvaluations: [...prevState.listEvaluations, saveEvaluation],
    }), () => {
      const { listEvaluations } = this.state;
      const { pathname } = window.location;
      const id = pathname.split('/')[2];
      localStorage.setItem(id, JSON.stringify(listEvaluations));
    });
    this.setState({
      detailEmail: '',
      detailEvaluation: '',
      rateForm: ['', '', '', '', ''],
      validateForm: true,
    });
  };

  render() {
    const {
      rateForm,
      validateForm,
      listEvaluations,
      detailEmail,
      detailEvaluation,
      rateEvaluation,
    } = this.state;
    return (
      <section class="card p-6 card-size">
        <h2 className="title is-5 has-text-centered">Avaliações </h2>
        <fieldset>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                data-testid="product-detail-email"
                type="email"
                class="input"
                name="detailEmail"
                placeholder="E-mail"
                value={ detailEmail }
                onChange={ this.handleChange }
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Mensagem</label>
              <div class="control">
                <textarea
                  data-testid="product-detail-evaluation"
                  name="detailEvaluation"
                  class="textarea"
                  placeholder="Opcional"
                  onChange={ this.handleChange }
                  value={ detailEvaluation }
                />
              </div>
            </div>

            <div class="field is-flex is-justify-content-space-between is-align-items-center">
              <div>
                { rateForm.map((checkedStar, index) => (
                  <span
                    key={ index }
                    className={ `fa fa-star ${checkedStar}` }
                    data-testid={ `${index + 1}-rating` }
                    onClick={ () => this.handleRate(index) }
                    role="presentation"
                  />
                ))}
              </div>
              <button
                data-testid="submit-review-btn"
                onClick={ this.handleButtonSubmit }
                class="button is-warning"
              >
                Avaliar
              </button>
          </div>
        </fieldset>
        { !validateForm && <h3 data-testid="error-msg">Campos inválidos</h3> }
        { listEvaluations.map(({ email, text, rating }, index) => (
          <div key={ index }>
            <hr/>
            <p 
              data-testid="review-card-email"
              class="field"
            >
              <i class="fa-solid fa-user mr-3" />
              { email }
            </p>
            <div data-testid="review-card-rating" class="ml-3">
              { rateEvaluation.map((_element, ind) => (
                <span
                  key={ ind }
                  className={ `fa fa-star ${(rating - 1) >= ind ? 'checked' : ''}` }
                  role="presentation"
                />
              ))}
            </div>
            <p 
              data-testid="review-card-evaluation"
              class="mt-3 ml-3"
            >
              <em>{ text }</em>
            </p>
          </div>
        ))}
      </section>
    );
  }
}

FormItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormItem;
