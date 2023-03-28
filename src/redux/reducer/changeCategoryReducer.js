import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function changeCategoryReducer(
  state = initialState.currentCategory,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return action.payload;

    default:
      return state;
  }
}
