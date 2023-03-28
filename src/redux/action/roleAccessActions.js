import * as actionTypes from "./actionTypes";

export function getRoleAccessSuccess(roles) {
  return { type: actionTypes.GET_ROLEACCESS_SUCCESS, payload: roles };
}
export function getRoleAccess(role) {
  let url;

  return function (dispatch) {
    url = role && `http://localhost:3000/roleAccess?role=${role}&menu=customer`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch(getRoleAccessSuccess(data)))
      .catch((err) => {
        console.log(err.message);
      });
  };
}
