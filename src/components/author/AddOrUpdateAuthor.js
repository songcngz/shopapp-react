import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { sendAuthor } from "../../redux/action/authorActions";
import alertify from "alertifyjs"

import AuthorEdit from "./AuthorEdit";
function AddOrUpdateAuthor({
  authors,
  sendAuthor,
  history,
  ...props
}) {
  const navigate = useNavigate()
 

  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setAuthor({ ...props.author });
  }, [props.author]);

  function handleChange(e) {
    const { name, value } = e.target;
    setAuthor((previousAuthor) => ({
      ...previousAuthor,
      [name]: value,
    }));
    validate(name, value);
  }
  function validate(name, value) {
    if (!value && name === "authorName") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        authorName: "You must enter the author name❗",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        authorName: "",
      }));
    }
  }
  const reset = () => {
    setAuthor("");
  };
  function handleSubmit(e) {
    e.preventDefault();
    sendAuthor(author)
    navigate("/")
    alertify.success(`${author.authorName},saved changes`)
    reset()
   
  }

  return (
    <AuthorEdit
      onSubmit={handleSubmit}
      onChange={handleChange}
      author={author}
      errors={errors}
    />
  );
}
export function getAuthorById(authors, authorId) {
  // eslint-disable-next-line eqeqeq
  const author = authors.find((author) => author.id == authorId) || "";
  return author;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authorId } = useParams();
  const author =
    authorId && state.authorListReducer
      ? getAuthorById(state.authorListReducer, authorId)
      : {};
  return {
    author,
    authors: state.authorListReducer,
  };
}
const mapDispatchToProps = {
  sendAuthor,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateAuthor);
