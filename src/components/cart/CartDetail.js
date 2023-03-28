import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../redux/action/productActions";
import { removeFromCart } from "../../redux/action/cartActions";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Fab,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { pink } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

function CartDetail({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const handleRemoveCart = (product) => {
    removeFromCart(product);
  };

  function renderCartDetail() {
    return (
      <>
        <h3>Your Cart</h3>

        <Paper elevation={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Paper Type</TableCell>
                  <TableCell align="left">Unit Price</TableCell>
                  <TableCell align="left">Units In Stock</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((cartItem) => (
                  <TableRow
                    key={cartItem.product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{cartItem.product.id}</TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/productdetail/${cartItem.product.id}`}>
                        {" "}
                        {cartItem.product.productName}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {cartItem.product.paperType}
                    </TableCell>
                    <TableCell align="left">
                      {cartItem.product.unitPrice}
                    </TableCell>
                    <TableCell align="left">
                      {cartItem.product.unitsInStock}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveCart(cartItem.product)}
                      >
                        {" "}
                        <DeleteForeverIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Fab
          size="small"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </Fab>
      </>
    );
  }

  function renderCartEmpty() {
    return (
      <div>
        <h3>Cart Empty</h3>
        <Link to={"/product"}>
          <Fab size="small" color="primary" sx={{ mr: 1 }}>
            <ArrowBackIosNewIcon />
          </Fab>
        </Link>
      </div>
    );
  }

  return (
    <Box sx={{ flexGrow: 0.05 }}>
      {cart.length ? renderCartDetail() : renderCartEmpty()}
    </Box>
  );
}

function mapStateToProps(state) {
  return { cart: state.cartReducer };
}

const mapDispatchToProps = {
  removeFromCart,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
