import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function sendCustomerReducer(
  state = initialState.savedCustomer,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_CUSTOMER_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_CUSTOMER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}