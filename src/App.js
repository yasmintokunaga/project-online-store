import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SearchField from './components/SearchField';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import FormItem from './components/FormItem';
import Checkout from './components/Checkout';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ SearchField } />
        <Route path="/shoppingcart" component={ ShoppingCart } />
        <Route path="/products/:id" component={ ProductDetails } />
        <Route path="/formitem" component={ FormItem } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </main>
  );
}

export default App;
