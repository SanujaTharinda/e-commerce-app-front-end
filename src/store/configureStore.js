import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toastGenerator from "./middleware/toast";
import api from "./middleware/api";
import { loadState } from './localStorage';

// eslint-disable-next-line import/no-anonymous-default-export
export default function() {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toastGenerator,
      api,
    ],
    preloadedState: loadState()
  });
}
