import React from "react";
import {Box, Button } from "@mui/material";
import TextInput from "../toolbox/TextInput";

const CustomerEdit = ({ customer, onSubmit, onChange, errors }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      autoComplete="off"
    >
      <h2>{customer.id ? "EDIT" : "ADD"}</h2>

      <TextInput
        name="customerName"
        value={customer.customerName || ""}
        placeholder={""}
        label="Customer Name"
        error={!!errors.customerName}
        helperText={errors?.customerName}
        onChange={onChange}
      />
      <TextInput
        name="email"
        value={customer.email || ""}
        placeholder={""}
        label="Customer Email"
        error={!!errors.email}
        helperText={errors?.email}
        onChange={onChange}
      />

      <Box sx={{ "& button": { m: 1 }, size: "large" }}>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default CustomerEdit;