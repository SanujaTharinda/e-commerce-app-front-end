import { toast } from 'react-toastify';
import { toastAction } from './../toastAction';

const toastGenerator = store => next => action => {
  if (action.type === toastAction.type) {
    toast[action.payload.type](action.payload.message);
  }
  else return next(action);
};

export default toastGenerator;
