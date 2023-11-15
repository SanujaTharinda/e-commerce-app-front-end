import { combineReducers } from "redux";
import entitiesReducer from "./entities/entities";
import cartReducer from './cart';
import authReducer from './auth';

export default combineReducers({
  entities: entitiesReducer,
  cart: cartReducer,
  auth: authReducer
});
