import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
  Avatar,
} from "@mui/material";

import SearchBar from "../common/Search";
import { getAuthors, authorSearch } from "../../redux/action/authorActions";
import PaginationComponent from "../common/Pagination";

function AuthorList({
  authors,
  changeAuthor,
  getAuthors,
  authorSearch,
  ...props
}) {
  const [page, setPage] = useState(1);
  const limit = 8;
  useEffect(() => {
    if (!props.authors) {
      getAuthors(page, limit);
    }
  }, [getAuthors, page, props.authors]);

  function handleChange(e) {
    setPage(e.target.textContent);
  }
  function searchChange(e) {
    const { value } = e.target;
    authorSearch(value);
  }
  return (
    <Paper
      elevation={3}
      style={{ margin: "1rem 0", padding: "0 1rem", lineHeight: "60px" }}
    >
      <Helmet>
        <title>Authorlist</title>
      </Helmet>
      <Box>
        <h3 style={{ textAlign: "center" }}>Authors</h3>
        <SearchBar
          onChange={searchChange}
          placeholder="Search authorname....."
        />
        <PaginationComponent onChange={handleChange} count={6} />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Author Image</TableCell>
                <TableCell align="left">Author Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow
                  key={author.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{author.id}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      alt={author.authorName}
                      src={author.authorImage}
                      sx={{ width: 60, height: 60 }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={`/authordetail/${author.id}`}>
                      {author.authorName}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    authors: state.authorListReducer,
    products: state.productListReducer,
  };
}

const mapDispatchToProps = {
  getAuthors,
  authorSearch,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);
