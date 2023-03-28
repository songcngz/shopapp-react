import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCategories,
  changeCategory,
} from "../../redux/action/categoryActions";
import { getProducts } from "../../redux/action/productActions";
import { List, ListItemButton, ListItemText, Paper, Box } from "@mui/material";
import SnackbarComponent from "../common/Snackbar";
import "../../css/HomePage.css";

function CategoryList({
  categories,
  currentCategory,
  getCategories,
  getProducts,
  changeCategory,
  ...props
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!props.categories) {
      getCategories();
    }
  }, [getCategories, props.categories]);

  function handleChangeCategory(category) {
    changeCategory(category);

    getProducts(category.id);
    setOpen(true);
  }
  return (
    <Paper
      className="Box" 
      elevation={4}
      style={{
        margin: "1rem 0",
        padding: "0 1rem",
        lineHeight: "60px",
        textAlign: "center",
      }}
    >
      <Box>
        <SnackbarComponent
          setOpen={setOpen}
          open={open}
          message={currentCategory.categoryName}
          severity="info"
        />
        <h3 color="darkslateblue">Categories</h3>

        <List>
          {categories.map((category) => (
            <ListItemButton
              onClick={() => handleChangeCategory(category)}
              key={category.id}
              divider
            >
              <ListItemText>{category.categoryName}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  changeCategory,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
