import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function authorListReducer(
  state = initialState.authors,
  action
) {
  switch (action.type) {
    case actionTypes.GET_AUTHORS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
