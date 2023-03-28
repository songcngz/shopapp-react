import React from "react";
import { connect } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import {
  Box,
  Grid,
  Fab,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { addToCart } from "../../redux/action/cartActions";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import alertify from "alertifyjs";

function ProductDetail({
  product,
  currentCategory,
  addToCart,
  cart,
  currentAuthor,
  ...props
}) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 4 },
      }}
    >
      <Grid container>
        <Grid item md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={product.productName}
              height="194"
              image={product.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.productName}
              </Typography>
              <Typography variant="body1" component="span">
                <span className="badge bg-primary">{product.paperType}</span>
              </Typography>
              <div>
                <NavLink to={`/authordetail/${product.authorId}`}>
                  {product.authorName}
                </NavLink>
              </div>

              {product.publisherName && (
                <div>
                  <NavLink to={`/publisherdetail/${product.publisherId}`}>
                    {product.publisherName}
                  </NavLink>
                </div>
              )}
            </CardContent>
            <CardActions>
              <NavLink to={"/product"}>
                <Fab size="small" color="primary" sx={{ mr: 1 }}>
                  <ArrowBackIosNewIcon />
                </Fab>
              </NavLink>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export function getProductById(products, productId) {
  // eslint-disable-next-line eqeqeq
  const product = products.find((product) => product.id == productId) || null;
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
    products: state.productListReducer,
    categories: state.categoryListReducer,
    currentCategory: state.changeCategoryReducer,
    currentAuthor: state.changeAuthorReducer,
    cart: state.cartReducer,
  };
}
const mapDispatchToProps = {
  addToCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
