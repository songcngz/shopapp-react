import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function changeUserReducer(
  state = initialState.currentUser,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_USER:
      return action.payload;

    default:
      return state;
  }
}