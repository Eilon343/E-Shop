import { storeReducer, createContext, useReducer} from './Imports';

export const Store = createContext();

// Define the initial state of the store
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// // Define the reducer function to handle state updates based on dispatched actions
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       // Add a new item to the cart or update the quantity of an existing item
//       const newItem = action.payload;
//       const existingItem = state.cart.cartItems.find(
//         (item) => item._id === newItem._id
//       );
//       const cartItems = existingItem
//         ? state.cart.cartItems.map((item) =>
//             item._id === existingItem._id ? newItem : item
//           )
//         : [...state.cart.cartItems, newItem];

//       // Save the updated cart items in local storage
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));

//       // Return the updated state with the modified cart items
//       return { ...state, cart: { ...state.cart, cartItems } };
//     }

//     case 'REMOVE_FROM_CART': {
//       // Remove an item from the cart
//       const cartItems = state.cart.cartItems.filter(
//         (item) => item._id !== action.payload._id
//       );

//       // Save the updated cart items in local storage
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));

//       // Return the updated state with the modified cart items
//       return { ...state, cart: { ...state.cart, cartItems } };
//     }

//     case 'DROP_END': {
//       // Handle the drag and drop operation for reordering cart items
//       if (!action.payload.destination) {
//         // If the destination is not defined, return the current state
//         return { ...state };
//       }

//       const items = Array.from(state.cart.cartItems);
//       const [reorderedItem] = items.splice(action.payload.source.index, 1);
//       items.splice(action.payload.destination.index, 0, reorderedItem);

//       // Return the updated state with the reordered cart items
//       return { ...state, cart: { ...state.cart, cartItems: items } };
//     }
//     case 'USER_SIGNIN': {
//       return { ...state, userInfo: action.payload };
//     }
//     case 'USER_SIGNOUT': {
//       return { ...state, userInfo: null };
//     }
//     case 'SAVE_SHIPPING_ADDRESS': {
//       return { ...state, shippingAddress: action.payload };
//     }

//     default:
//       // For any other action types, return the current state
//       return state;
//   }
// };

export function StoreProvider(props) {
  // Use the reducer hook to manage state updates and provide the state and dispatch values to the store context
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const body = { state, dispatch };

  // Render the provider with the value prop containing the state and dispatch values
  return <Store.Provider value={body}>{props.children}</Store.Provider>;
}
