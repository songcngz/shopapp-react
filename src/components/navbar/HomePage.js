import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Grid, ButtonBase, Box, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  productPagination,
  productSearch,
} from "../../redux/action/productActions";
import { getAuthors } from "../../redux/action/authorActions";
import { getPublishers } from "../../redux/action/publisherActions";
import { getCategories } from "../../redux/action/categoryActions";
import { getCustomers } from "../../redux/action/customerActions";
import PaginationComponent from "../common/Pagination";
import SearchBar from "../common/Search";
import "../../css/HomePage.css";

const images = [
  {
    url: "https://cdn.pixabay.com/photo/2019/05/14/21/50/storytelling-4203628__340.jpg",
    title: "Books",
    width: "40%",
    link: "/product",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014__340.jpg",
    title: "Publishers",
    width: "30%",
    link: "/publisher",
  },
  {
    url: "https://cdn.pixabay.com/photo/2017/03/23/12/23/vintage-2168174__340.jpg",
    title: "Authors",
    width: "30%",
    link: "/author",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const limit = 5;

function HomePage({
  products,
  productPagination,
  getAuthors,
  getPublishers,
  getCategories,
  productSearch,
  getCustomers,
 
  ...props
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (
      !props.products ||
      !props.authors ||
      !props.publishers ||
      !props.categories ||
      !props.customers
    ) {
      productPagination(page, limit);
      getAuthors();
      getPublishers();
      getCategories();
      getCustomers()
    }
  }, [getAuthors, getCategories, getCustomers, getPublishers, page, productPagination, props.authors, props.categories, props.customers, props.products, props.publishers]);
  function handleChange(e) {
    setPage(e.target.textContent);
  }
  function searchChange(e) {
    const { value } = e.target;
    const searchProduct = value.toLowerCase();

    productSearch(searchProduct);
  }
  return (
    <Box>
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="homepage description" />
      </Helmet>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <NavLink to={image.link}>
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}

                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </NavLink>
        </ImageButton>
      ))}
      <Box>
      
        <SearchBar onChange={searchChange} placeholder="Search book..." />
        <PaginationComponent onChange={handleChange} count={16} />
        <Grid container>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: 210,
                marginRight: 2.5,
                my: 4,
                textAlign: "center",
              }}
              className="Book"
            >
              <NavLink to={`/productdetail/${product.id}`}>
                <img
                  style={{ width: 150, height: 140 }}
                  alt={product.productName}
                  src={product.imageUrl}
                />

                <Box className="underline">
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                  >
                    {product.productName}
                  </Typography>

                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {product.authorName}
                  </Typography>
                </Box>
              </NavLink>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
function mapStateToProps(state) {
  return {
    products: state.productListReducer
  };
}
const mapDispatchToProps = {
  productPagination,
  getAuthors,
  getPublishers,
  productSearch,
  getCategories,
  getCustomers
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
