import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/action/categoryActions";
import { sendProduct } from "../../redux/action/productActions";
import ProductEdit from "./ProductEdit";
import alertify from "alertifyjs";
function AddOrUpdateProduct({
  products,
  categories,
  authors,
  publishers,
  getCategories,
  sendProduct,
  history,
  ...props
}) {
  const navigate = useNavigate()
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!categories) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [getCategories, categories, props.product]);

  function handleChange(e) {
    let { name, value } = e.target;

    setProduct((previousProduct) => {
      if (name === "unitPrice")
        return { ...previousProduct, [name]: Number(value) };
      else if (name === "unitsInStock")
        return { ...previousProduct, [name]: Number(value) };
      else if (name === "categoryId")
        return { ...previousProduct, [name]: parseInt(value, 10) };
      else {
        return { ...previousProduct, [name]: value };
      }
    });
    validate(name, value);
  }

  function validate(name, value) {
    if (!value && name === "productName") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "You must enter the product name❗",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }
  }
  const reset = () => {
    setProduct("");
  };
  function handleSubmit(e) {
    e.preventDefault();
    sendProduct(product)
    navigate("/")
    alertify.success(`${product.productName},saved changes`)
    reset()
  }

  return (
    <ProductEdit
      onSubmit={handleSubmit}
      onChange={handleChange}
      product={product}
      categories={categories}
      authors={authors}
      publishers={publishers}
      errors={errors}
    />
  );
}
export function getProductById(products, productId) {
  // eslint-disable-next-line eqeqeq
  const product = products.find((product) => product.id == productId) || "";
  return product;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { productId } = useParams();
  const product =
    productId && state.productListReducer
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    categories: state.categoryListReducer,
    authors: state.authorListReducer,
    publishers: state.publisherListReducer,
    products: state.productListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  sendProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
