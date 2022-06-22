import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0
};

const getTotalPrice = arr => arr.reduce((acc, item) => acc + item.price, 0)

const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const currentItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload]
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentItems,
          totalPrice: getTotalPrice(currentItems)
        },
      };
      const items = Object.values(newItems).map(obj => obj.items)
      const item = items.flat()
      return {
          ...state,
         items: newItems,
         totalCount: item.length,
         totalPrice: getTotalPrice(item),
      };
        

    case REMOVE_FROM_CART:{
      const newItems = {
        ...state.items
      }
      const currentTotalPrice = newItems[action.payload].totalPrice
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload]
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount
      }
    }
    case CLEAR_CART:   
    return {
      ...state,
      items: {},
      totalPrice: 0,
      totalCount: 0
    }
    
    default:
  return state;
  }
};

export default cartItems;
