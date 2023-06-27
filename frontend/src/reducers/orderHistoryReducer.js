import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../Imports';

export const orderHistoryReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_SUCCESS:
      return { ...state, loading: false, orders: payload, error: '' };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
