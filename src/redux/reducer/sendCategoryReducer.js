import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function sendCategoryReducer(
  state = initialState.savedCategory,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}