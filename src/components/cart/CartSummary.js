import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { removeFromCart } from "../../redux/action/cartActions";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Divider,
} from "@mui/material";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { pink } from "@mui/material/colors";
import alertify from "alertifyjs";

function CartSummary({ cart, removeFromCart }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event?.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRemoveCart = (product) => {
    removeFromCart(product);
    alertify.error(`${product.productName} removed to cart`);
  };

  const cartSummary = () => {
    return (
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {cart.map((cartItem) => (
          <MenuItem
            key={cartItem.product.id}
            onClick={handleCloseUserMenu}
            divider
          >
            <Typography textAlign="center">
              <IconButton onClick={() => handleRemoveCart(cartItem.product)}>
                <DeleteIcon sx={{ color: pink[600] }} />
              </IconButton>

              {cartItem.product.productName}
              <span className="badge bg-success rounded-pill">
                {cartItem.quantity}
              </span>
            </Typography>
          </MenuItem>
        ))}
        <NavLink to="/cart">
          <MenuItem>
            <ShoppingCartCheckoutIcon />
            Your Cart
          </MenuItem>
        </NavLink>
      </Menu>
    );
  };

  const cartEmpty = () => {
    return (
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent="empty"
        color="secondary"
      ></Badge>
    );
  };
  return (
    <Box sx={{ flexGrow: 0.1 }}>
      <Tooltip title="Open cart summary">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 1, backgroundColor: "white" }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>
      {cart.length ? cartSummary() : cartEmpty()}
    </Box>
  );
}

function mapStateToProps(state) {
  return { cart: state.cartReducer };
}

const mapDispatchToProps = {
  removeFromCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
