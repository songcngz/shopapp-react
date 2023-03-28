import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams,useNavigate  } from "react-router-dom";
import { sendCategory } from "../../redux/action/categoryActions";
import alertify from "alertifyjs"

import CategoryEdit from "./CategoryEdit";
function AddOrUpdateCategory({
  categories,
  sendCategory,
  history,
  ...props
}) {

 
  const navigate = useNavigate()
 

  const [category, setCategory] = useState({ ...props.category });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCategory({ ...props.category });
  }, [props.category]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCategory((previousPublisher) => ({
      ...previousPublisher,
      [name]: value,
    }));
    validate(name, value);
  }
  function validate(name, value) {
    if (!value && name === "categoryName") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryName: "You must enter the category name❗",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryName: "",
      }));
    }
  }
  const reset = () => {
    setCategory("");
  };
  function handleSubmit(e) {
    e.preventDefault();
    sendCategory(category)
    navigate("/")
    alertify.success(`${category.categoryName},saved changes`)
    reset()
  
  }

  return (
    <CategoryEdit
      onSubmit={handleSubmit}
      onChange={handleChange}
      category={category}
      errors={errors}
  
    />
  );
}
export function getCategoryById(categories, categoryId) {
  // eslint-disable-next-line eqeqeq
  const category =
    categories.find((category) => category.id == categoryId) || "";
  return category;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { categoryId } = useParams();
  const category =
    categoryId && state.categoryListReducer
      ? getCategoryById(state.categoryListReducer, categoryId)
      : {};
  return {
    category,
    categories: state.categoryListReducer,
  };
}
const mapDispatchToProps = {
  sendCategory,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrUpdateCategory);
