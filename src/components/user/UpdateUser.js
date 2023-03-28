import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendUser } from "../../redux/action/userActions";
import alertify from "alertifyjs";
import UserEdit from "./UserEdit";

function AddOrUpdateUser({ users, sendUser, history, ...props }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser({ ...props.user });
  }, [props.user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));
    validate(name, value);
  }
  function validate(name, value) {
    if (!value && name === "firstName") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        firstName: "You must enter the first name❗",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        firstName: "",
      }));
    }
  }
  const reset = () => {
    setUser("");
  };
  function handleSubmit(e) {
    e.preventDefault();
    sendUser(user);
    navigate("/");
    alertify.success(`${user.firstName},saved changes`);
    reset();
  }

  return (
    <UserEdit
      onSubmit={handleSubmit}
      onChange={handleChange}
      user={user}
      errors={errors}
    />
  );
}
export function getUserById(users, userId) {
  // eslint-disable-next-line eqeqeq
  const user = users.find((user) => user.id == userId) || "";
  return user;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId } = useParams();
  const user =
    userId && state.userListReducer
      ? getUserById(state.userListReducer, userId)
      : {};
  return {
    user,
    users: state.userListReducer,
  };
}
const mapDispatchToProps = {
  sendUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateUser);
