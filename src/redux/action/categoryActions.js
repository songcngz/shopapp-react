import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
}
export function createCategorySuccess(category) {
  return { type: actionTypes.CREATE_CATEGORY_SUCCESS, payload: category };
}
export function updateCategorySuccess(category) {
  return { type: actionTypes.UPDATE_CATEGORY_SUCCESS, payload: category };
}

export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getCategoriesSuccess(data)));
  };
}
export function sendCategoryApi(category) {
  return fetch(`http://localhost:3000/categories/${category.id || ""}`, {
    method: category.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(category),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendCategory(category) {
  return function (dispatch) {
    return sendCategoryApi(category).then((savedCategory) =>
      category.id
        ? dispatch(updateCategorySuccess(savedCategory))
        : dispatch(createCategorySuccess(savedCategory))
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
  console.error("Bir hata oluştu");
  throw error;
}
