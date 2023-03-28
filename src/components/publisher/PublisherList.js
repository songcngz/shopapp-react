import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
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
} from "@mui/material";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SearchBar from "../common/Search";
import {
  getPublishers,
  publisherSearch,
} from "../../redux/action/publisherActions";

function PublisherList({
  publishers,
  getPublishers,
  publisherSearch,
  ...props
}) {
  useEffect(() => {
    if (!props.publishers) {
      getPublishers();
    }
  }, [getPublishers, props.publishers]);

  function searchChange(e) {
    publisherSearch(e.target.value);
  }
  return (
    <Paper
      elevation={3}
      style={{ margin: "1rem 0", padding: "0 1rem", lineHeight: "60px" }}
    >
      <Helmet>
        <title>Publisherlist</title>
      </Helmet>
      <Box>
        <h3 style={{ textAlign: "center" }}>Publishers</h3>
        <SearchBar
          onChange={searchChange}
          placeholder="Search publishername....."
        />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Publisher Name</TableCell>
                <TableCell align="left">
                  Publisher Phone <ContactPhoneIcon />
                </TableCell>
                <TableCell align="left">
                  Publisher Email <ContactMailIcon />
                </TableCell>
                <TableCell align="left">Publisher Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publishers.map((publisher) => (
                <TableRow
                  key={publisher.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{publisher.id}</TableCell>

                  <TableCell component="th" scope="row">
                    <NavLink to={`/publisherdetail/${publisher.id}`}>
                      {publisher.publisherName}
                    </NavLink>
                  </TableCell>
                  <TableCell align="left">{publisher.publisherPhone}</TableCell>
                  <TableCell align="left">
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="staticEmail"
                        value={publisher.publisherEmail}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <a href={publisher.publisherWebsite} aria-current="true">
                      {publisher.publisherWebsite}
                    </a>
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
    publishers: state.publisherListReducer,
    products: state.productListReducer,
  };
}

const mapDispatchToProps = {
  getPublishers,
  publisherSearch,
};
export default connect(mapStateToProps, mapDispatchToProps)(PublisherList);
