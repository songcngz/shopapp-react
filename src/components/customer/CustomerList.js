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
} from "@mui/material";
import {
  getCustomers,
  removeCustomer,
} from "../../redux/action/customerActions";
import { getRoleAccess } from "../../redux/action/roleAccessActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PaginationComponent from "../common/Pagination";
import alertify from "alertifyjs";

function CustomerList({
  getCustomers,
  customers,
  getRoleAccess,
  removeCustomer,
  ...props
}) {
  useEffect(() => {
    if (!props.customer) {
      getCustomers();
    }
  }, [getCustomers, props.customer]);

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/editcustomer");
  };
  const handleEdit = (customer) => {
    navigate(`/editcustomer/${customer.id}`);
  };
  const handleDelete = (customer) => {
    removeCustomer(customer);
    navigate("/");
    alertify.success(`${customer.customerName} deleted!`); 
  };

  return (
    <Paper
      elevation={3}
      style={{
        margin: "1rem 0",
        padding: "0 1rem",
        lineHeight: "60px",
        textAlign: "center",
      }}
    >
      <Helmet>
        <title>CustomerList</title>
      </Helmet>
      <Box>
        <h3>--Customers--</h3>
        <div style={{ textAlign: "left" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleAdd()}
          >
            Add
          </Button>
        </div>

        {customers.length > 0 && (
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Customer Name</TableCell>
                  <TableCell align="left">Customer Email</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{customer.id}</TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {customer.customerName}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {customer.email}
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        style={{ marginRight: "0.5rem" }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        endIcon={<EditIcon />}
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ marginRight: "0.5rem" }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleDelete(customer)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerListReducer,
    roles: state.roleListReducer,
  };
};
const mapDispatchToProps = {
  getCustomers,
  getRoleAccess,
  removeCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
