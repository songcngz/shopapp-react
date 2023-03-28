import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function customerListReducer(
  state = initialState.customers,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS_SUCCESS:
      return action.payload;
    case actionTypes.REMOVE_CUSTOMER_SUCCESS:
      let newState = state.filter(
        (customer) => customer.id !== action.payload.id
      );
      return newState;
    default:
      return state;
  }
}
