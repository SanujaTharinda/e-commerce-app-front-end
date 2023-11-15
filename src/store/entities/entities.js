import { combineReducers } from "redux";
import productsReducer from './products';
import categoriesReducer from './categories';
import customersReducer from './customers';
import usersReducer from './users';
import ordersReducer from './orders'
import customAttributesreducer from './customAttributes';


export default combineReducers({
  products: productsReducer,
  customers: customersReducer,
  categories: categoriesReducer,
  users: usersReducer,
  orders : ordersReducer,
  customAttributes: customAttributesreducer
});
