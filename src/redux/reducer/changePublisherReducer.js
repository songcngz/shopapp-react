import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";

export default function changePublisherReducer(
  state = initialState.currentPublisher,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_PUBLISHER:
      return action.payload;

    default:
      return state;
  }
}