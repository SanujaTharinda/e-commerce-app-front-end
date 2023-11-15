import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { saveState } from './store/localStorage';

const store = configureStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth, 
    cart: store.getState().cart,
    entities: {
      products: store.getState().entities.products,
      categories: store.getState().entities.categories,
      customers: store.getState().entities.customers,
      orders: store.getState().entities.orders
    }
  });
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}> 
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
