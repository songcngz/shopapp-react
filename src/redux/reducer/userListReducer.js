import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function userListReducer(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
