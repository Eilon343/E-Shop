import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../store';
import { orderHistoryReducer } from '../reducers/orderHistoryReducer';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../Actions';
import { getError } from '../utils';
import { Loading, MessageBox, Helmet, useNavigate } from '../Imports';
import OrderHistoryItem from '../components/OrderHistoryItem';

const OrderHistory = () => {
  const { state } = useContext(Store);
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(
    orderHistoryReducer,
    {
      loading: true,
      orders: null,
      error: '',
    }
  );

  // Extracting user info and shipping address from global state
  const { userInfo } = state;
  useEffect(() => {
    const getOrders = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const { data } = await axios.get(
          `/api/v1/orders/history/${userInfo._id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };
    getOrders();
    if (!userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      {orders.map((order) => (
        <OrderHistoryItem order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;
