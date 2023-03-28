import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}
export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function getProducts(categoryId) {
  let url;
  return function (dispatch) {
    url = categoryId
      ? `http://localhost:3000/products?categoryId=${categoryId}`
      : "http://localhost:3000/products";

    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}
export function getProductsWithAuthor(authorId) {
  let url;
  return function (dispatch) {
    url = authorId
      ? `http://localhost:3000/products?authorId=${authorId}`
      : "http://localhost:3000/products";

    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}
export function getProductsWithPublisher(publisherId) {
  let url;
  return function (dispatch) {
    url = publisherId
      ? `http://localhost:3000/products?publisherId=${publisherId}`
      : "";

    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}

export function productPagination(page = 1, limit = 6) {
  let url;
  return function (dispatch) {
    url = page
      ? `http://localhost:3000/products?_page=${page}&_limit=${limit}`
      : "";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}
export function productSearch(searchProduct) {
  let url;

  return function (dispatch) {
    url = searchProduct && `http://localhost:3000/products?q=${searchProduct}`;

    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}

export function sendProductApi(product) {
  return fetch(`http://localhost:3000/products/${product.id || ""}`, {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendProduct(product) {
  return function (dispatch) {
    return sendProductApi(product).then((savedProduct) =>
      product.id
        ? dispatch(updateProductSuccess(savedProduct))
        : dispatch(createProductSuccess(savedProduct))
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
