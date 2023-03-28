import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  Typography,
  Grid,
  Card,
  Stack,
} from "@mui/material";

import "../../css/HomePage.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import EditIcon from "@mui/icons-material/Edit";
import { getProducts } from "../../redux/action/productActions";
import { addToCart } from "../../redux/action/cartActions";
import { getAuthors } from "../../redux/action/authorActions";
import { getPublishers } from "../../redux/action/publisherActions";
import { productPagination } from "../../redux/action/productActions";
import PaginationComponent from "../common/Pagination";
import alertify from "alertifyjs";



function ProductList({
  products,
  authors,
  publishers,
  getProducts,
  getAuthors,
  getPublishers,
  currentCategory,
  currentAuthor,
  addToCart,
  productPagination,
  currentUser,
  roles,
  ...props
}) {
  function renderAdminProductList() {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Paper Type</TableCell>
              <TableCell align="left">Unit Price</TableCell>
              <TableCell align="left">Units In Stock</TableCell>
              <TableCell align="left">Author Name</TableCell>
              <TableCell align="left">Publisher Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{product.id}</TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={`/productdetail/${product.id}`}>
                    {product.productName}
                  </NavLink>
                </TableCell>
                <TableCell align="left">{product.paperType}</TableCell>
                <TableCell align="left">{product.unitPrice}</TableCell>
                <TableCell align="left">{product.unitsInStock}</TableCell>
                <TableCell align="left">{product.authorName}</TableCell>
                <TableCell align="left">{product.publisherName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAddCart(product)}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditProduct(product)}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  function renderUserProductList() {
    return (
      <Grid container>
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: 210,
              marginLeft: 6,
              my: 2,
              textAlign: "center",
            }}
          >
            <Card>
              <img
                style={{ width: 210, height: 220 }}
                alt={product.productName}
                src={product.imageUrl}
              />

              <Stack spacing={2} sx={{ p: 3 }}>
                <NavLink
                  to={`/productdetail/${product.id}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="subtitle2" noWrap>
                    {product.productName}
                  </Typography>
                </NavLink>

                <Typography variant="subtitle1">
                  <Typography component="span" variant="body1">
                    {product.unitPrice}<CurrencyBitcoinIcon/>
                  </Typography>
                </Typography>
              </Stack>
            </Card>

            <Box>
              {" "}
              <Button
                onClick={() => {
                  currentUser.firstName.length > 0
                    ? handleAddCart(product)
                    : alertify.error(
                        "Please register or login to add product to cart😉😉"
                      );
                }}
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<AddShoppingCartIcon />}
              >
                Add
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    );
  }
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authors) {
      getAuthors();
    } else if (!props.publishers) {
      getPublishers();
    }
    productPagination(page);
  }, [
    getAuthors,
    getPublishers,
    page,
    productPagination,
    props.authors,
    props.products,
    props.publishers,
  ]);

  function handleAddCart(product) {
    addToCart({ quantity: 1, product });
    alertify.success(`${product.productName} added to cart`);
  }
  function handleChange(e) {
    setPage(e.target.textContent);
  }
  function handleEditProduct(product) {
    navigate(`/editproduct/${product.id}`);
  }

  return (
    <Paper
      elevation={0}
      style={{
        margin: "1rem 0",
        padding: "0 1rem",
        lineHeight: "60px",
        textAlign: "center",
      }}
    >
      <Helmet>
        <title>BOOKLIST</title>
        <meta name="description" content="product description" />
      </Helmet>
   
        <PaginationComponent onChange={handleChange} count={8} />

        {roles[0] && roles[0].role == "admin"
          ? renderAdminProductList()
          : renderUserProductList()}
     
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
    publishers: state.publisherListReducer,
    authors: state.authorListReducer,
    currentAuthor: state.changeAuthorReducer,
    currentUser: state.changeUserReducer,
    roles: state.roleListReducer,
  };
}

const mapDispatchToProps = {
  getProducts,
  addToCart,
  getAuthors,
  getPublishers,
  productPagination,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
