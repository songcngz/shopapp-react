import * as actionTypes from "./actionTypes";

export function changeAuthor(author) {
  return { type: actionTypes.CHANGE_AUTHOR, payload: author };
}
export function createAuthorSuccess(author) {
  return { type: actionTypes.CREATE_AUTHOR_SUCCESS, payload: author };
}
export function updateAuthorSuccess(author) {
  return { type: actionTypes.UPDATE_AUTHOR_SUCCESS, payload: author };
}

export function getAuthorsSuccess(authors) {
  return { type: actionTypes.GET_AUTHORS_SUCCESS, payload: authors };
}

export function getAuthors(page) {
  return function (dispatch) {
    let url = page
      ? `http://localhost:3000/authors?_page=${page}`
      : "http://localhost:3000/authors";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getAuthorsSuccess(data)));
  };
}
export function authorSearch(searchauthor) {
  let url;
  return function (dispatch) {
    url = searchauthor
      ? `http://localhost:3000/authors?q=${searchauthor}`
      : "";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getAuthorsSuccess(data)));
  };
}
export function sendAuthorApi(author) {
  return fetch(`http://localhost:3000/authors/${author.id || ""}`, {
    method: author.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendAuthor(author) {
  return function (dispatch) {
    return sendAuthorApi(author).then((savedAuthor) =>
      author.id
        ? dispatch(updateAuthorSuccess(savedAuthor))
        : dispatch(createAuthorSuccess(savedAuthor))
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
