import * as actionTypes from "./actionTypes";

export function changeUser(user) {
  return { type: actionTypes.CHANGE_USER, payload: user };
}

export function getUsersSuccess(users) {
  return { type: actionTypes.GET_USERS_SUCCESS, payload: users };
}
export function createUserSuccess(user) {
  return { type: actionTypes.CREATE_USER_SUCCESS, payload: user };
}
export function updateUserSuccess(user) {
  return { type: actionTypes.UPDATE_USER_SUCCESS, payload: user };
}
export function userSearch(userEmail) {
  let url;

  return function (dispatch) {
    url = userEmail && `http://localhost:3000/users?email=${userEmail}`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch(getUsersSuccess(data)))
      .catch((err) => {
        console.log(`Login failed due to: ${err.message}`);
      });
  };
}

export function getUsers() {
  return function (dispatch) {
    let url = "http://localhost:3000/users";
    return fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch(getUsersSuccess(data)));
  };
}
export function sendUserApi(user) {
  return fetch(`http://localhost:3000/users/${user.id || ""}`, {
    method: user.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendUser(user) {
  return function (dispatch) {
    return sendUserApi(user).then((savedUser) =>
      user.id
        ? dispatch(updateUserSuccess(savedUser))
        : dispatch(createUserSuccess(savedUser))
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
  console.log(error.message);
  throw error;
}
