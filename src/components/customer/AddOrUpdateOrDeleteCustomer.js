import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import {
  sendCustomer,
  removeCustomer,
} from "../../redux/action/customerActions";
import CustomerEdit from "./CustomerEdit";

const AddOrUpdateOrDeleteCustomer = ({ customers, sendCustomer, ...props }) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ ...props.customer });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setCustomer({ ...props.customer });
  }, [props.customer]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
    validate(name, value);
  }
  function validate(name, value) {
    if (!value && name === "customerName") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        customerName: "You must enter the customer name❗",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        customerName: "",
      }));
    }
  }
  const reset = () => {
    setCustomer("");
  };
  function handleSubmit(e) {
    e.preventDefault();
    sendCustomer(customer)
    navigate("/customer")
    alertify.success(`${customer.customerName},saved changes`);
    reset();
  }

  return (
    <CustomerEdit
      customer={customer}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errors={errors}
    />
  );
};
export function getCustomerById(customers, customerId) {
  // eslint-disable-next-line eqeqeq
  const customer =
    customers.find((customer) => customer.id == customerId) || "";
  return customer;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { customerId } = useParams();
  const customer =
    customerId && state.customerListReducer
      ? getCustomerById(state.customerListReducer, customerId)
      : {};
  return {
    customer,
    customers: state.customerListReducer,
  };
}
const mapDispatchToProps = {
  sendCustomer,
  removeCustomer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrUpdateOrDeleteCustomer);
