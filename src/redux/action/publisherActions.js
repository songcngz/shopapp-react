import * as actionTypes from "./actionTypes";

export function changePublisher(publisher) {
  return { type: actionTypes.CHANGE_PUBLISHER, payload: publisher };
}
export function getPublishersSuccess(publishers) {
  return { type: actionTypes.GET_PUBLISHERS_SUCCESS, payload: publishers };
}
export function createPublisherSuccess(publisher) {
  return { type: actionTypes.CREATE_PUBLISHER_SUCCESS, payload: publisher };
}
export function updatePublisherSuccess(publisher) {
  return { type: actionTypes.UPDATE_PUBLISHER_SUCCESS, payload: publisher };
}

export function getPublishers() {
  return function (dispatch) {
    let url = "http://localhost:3000/publishers";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getPublishersSuccess(data)));
  };
}
export function publisherSearch(searchpublisher) {
  let url;
  return function (dispatch) {
    url =
      searchpublisher &&
      `http://localhost:3000/publishers?q=${searchpublisher}`;

    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getPublishersSuccess(data)));
  };
}
export function sendPublisherApi(publisher) {
  return fetch(`http://localhost:3000/publishers/${publisher.id || ""}`, {
    method: publisher.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(publisher),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendPublisher(publisher) {
  return function (dispatch) {
    return sendPublisherApi(publisher).then((savedPublisher) =>
      publisher.id
        ? dispatch(updatePublisherSuccess(savedPublisher))
        : dispatch(createPublisherSuccess(savedPublisher))
    );
  };
}

export async function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const error = await res.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error(error);
  throw error;
}
