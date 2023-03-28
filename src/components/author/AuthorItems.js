import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAuthors, changeAuthor } from "../../redux/action/authorActions";
import { getProductsWithAuthor } from "../../redux/action/productActions";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import { FixedSizeList } from "react-window";
import SnackbarComponent from "../common/Snackbar";
import "../../css/HomePage.css";

function AuthorItems({
  authors,
  getAuthors,
  currentAuthor,
  getProductsWithAuthor,
  changeAuthor,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!props.authors) {
      getAuthors();
    }
  }, [getAuthors, props.authors]);

  function handleChangeAuthor(author) {
    changeAuthor(author);
    getProductsWithAuthor(author.id);
    setOpen(true);
  }
  function renderAuthors() {
    return (
      <List>
        {authors.map((author) => (
          <ListItem key={author.id} divider>
            <ListItemButton onClick={() => handleChangeAuthor(author)}>
              <ListItemAvatar>
                <Avatar alt={author.authorName} src={author.authorImage} />
              </ListItemAvatar>
              <ListItemText primary={author.authorName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
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
        <h3 color="darkslateblue">Authors</h3>
        <SnackbarComponent
          open={open}
          setOpen={setOpen}
          message={currentAuthor.authorName}
          severity="info"
        />

        <FixedSizeList
          height={300}
          itemSize={46}
          itemCount={authors.length}
          overscanCount={5}
        >
          {renderAuthors}
        </FixedSizeList>
      </Box>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    authors: state.authorListReducer,
    currentAuthor: state.changeAuthorReducer,
  };
}

const mapDispatchToProps = {
  getProductsWithAuthor,
  getAuthors,
  changeAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorItems);
