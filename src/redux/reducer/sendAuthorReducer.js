import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function sendAuthorReducer(
  state = initialState.savedAuthor,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_AUTHOR_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_AUTHOR_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}