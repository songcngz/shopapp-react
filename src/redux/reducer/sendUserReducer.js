import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function sendUserReducer(
  state = initialState.savedUser,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
