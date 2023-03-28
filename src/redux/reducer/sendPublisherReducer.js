import * as actionTypes from "../action/actionTypes";
import initialState from "./initialState";
export default function sendPublisherReducer(
  state = initialState.savedPublisher,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_PUBLISHER_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_PUBLISHER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}