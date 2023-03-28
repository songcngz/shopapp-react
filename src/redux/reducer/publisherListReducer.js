import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function publisherListReducer(
  state = initialState.publishers,
  action
) {
  switch (action.type) {
    case actionTypes.GET_PUBLISHERS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}