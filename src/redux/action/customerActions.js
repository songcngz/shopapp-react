import * as actionTypes from "./actionTypes";

export function getCustomersSuccess(customers) {
  return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers };
}
export function removeCustomerSuccess(customer) {
  return { type: actionTypes.REMOVE_CUSTOMER_SUCCESS, payload: customer };
}
export function createCustomerSuccess(customer) {
  return { type: actionTypes.CREATE_CUSTOMER_SUCCESS, payload: customer };
}
export function updateCustomerSuccess(customer) {
  return { type: actionTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer };
}

export function getCustomers() {
  return function (dispatch) {
    let url = "http://localhost:3000/customers";
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(getCustomersSuccess(data)));
  };
}
export function removeCustomerApi(customer) {
  if (window.confirm("Do you want to remove this customer?")) {
    return fetch(`http://localhost:3000/customers/${customer.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err.message));
  }
}
export function removeCustomer(customer) {
  return function (dispatch) {
    return removeCustomerApi(customer).then((savedCustomer) =>
      dispatch(removeCustomerSuccess(savedCustomer))
    );
  };
}
export function sendCustomerApi(customer) {
  return fetch(`http://localhost:3000/customers/${customer.id || ""}`, {
    method: customer.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(customer),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function sendCustomer(customer) {
  return function (dispatch) {
    return sendCustomerApi(customer).then((savedCustomer) =>
      customer.id
        ? dispatch(updateCustomerSuccess(savedCustomer))
        : dispatch(createCustomerSuccess(savedCustomer))
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
