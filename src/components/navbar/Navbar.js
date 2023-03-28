import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Container,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import CartSummary from "../cart/CartSummary";
import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { changeUser } from "../../redux/action/userActions";
import MenuAdmin from "./MenuAdmin";
import MenuUser from "./MenuUser";


function Navbar({ currentUser, changeUser, roles }) {
  const settings = [
    { id: 1, url: `/profile/${currentUser.id}`, header: "Profile" },
    { id: 2, url: "/login", header: "Logout" },
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [location.pathname]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event?.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event?.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    changeUser({ firstName: "", id: "" });
  };
  const renderUserLogout = () => {
    return (
      <>
        <Box sx={{ flexGrow: 0.1 }}>
          <Tooltip title={`${currentUser.firstName}`}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="S" src="../../images/avatar.jpg" />
            </IconButton>
          </Tooltip>
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
            {settings.map((setting) => (
              <MenuItem key={setting.id} onClick={() => handleCloseNavMenu}>
                <NavLink to={setting.url} style={{ textDecoration: "none" }}>
                  <Typography sx={{ color: "darkgray" }}>
                    {setting.header}
                  </Typography>
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <CartSummary />
      </>
    );
  };
  const renderUserLogin = () => {
    return (
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="join our family😊" sx={{ p: 0 }}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="S" src="../../images/avatar2.jpg" />
            </IconButton>
          </Tooltip>
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
            <MenuItem onClick={handleCloseUserMenu}>
              <NavLink
                to={"/login"}
                style={{ textDecoration: "none" }}
                replace="true"
              >
                <Typography
                  sx={{ my: 1, mr: 2, color: "purple" }}
                  textAlign="center"
                  onClick={handleLogout}
                >
                  Sign in
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <NavLink
                to={"/register"}
                style={{ textDecoration: "none" }}
                replace="true"
              >
                <Typography
                  sx={{ my: 1, mr: 2, color: "purple" }}
                  textAlign="center"
                  onClick={handleLogout}
                >
                  Sign up
                </Typography>
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>
      </>
    );
  };
  return (
    <>
      {showMenu && (
        <AppBar position="static" style={{ backgroundColor: "#4E6B9F" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <NavLink to={"/"}>
                <Tooltip title="Homepage">
                  <IconButton sx={{ p: 1, backgroundColor: "white" }}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
              </NavLink>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BookShop
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {roles[0] && roles[0].role == "admin" ? (
                    <MenuAdmin handleCloseNavMenu={handleCloseNavMenu} />
                  ) : (
                    <MenuUser handleCloseNavMenu={handleCloseNavMenu} />
                  )}
                </Menu>
              </Box>
              <StorefrontIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BookShop
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {roles[0] && roles[0].role == "admin" ? (
                  <MenuAdmin handleCloseNavMenu={handleCloseNavMenu} />
                ) : (
                  <MenuUser handleCloseNavMenu={handleCloseNavMenu} />
                )}
              </Box>
              {currentUser.firstName ? renderUserLogout() : renderUserLogin()}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
function mapStateToProps(state) {
  return {
    currentUser: state.changeUserReducer,
    roles: state.roleListReducer,
  };
}
const mapDispatchToProps = {
  changeUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
