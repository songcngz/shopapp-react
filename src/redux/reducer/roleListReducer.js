import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function roleListReducer(state = initialState.roles, action) {
  switch (action.type) {
    case actionTypes.GET_ROLEACCESS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
