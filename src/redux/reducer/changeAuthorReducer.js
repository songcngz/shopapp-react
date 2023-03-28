import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function changeAuthorReducer(
  state = initialState.currentAuthor,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_AUTHOR:
      return action.payload;

    default:
      return state;
  }
}
