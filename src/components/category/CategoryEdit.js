import React from "react";
import {Box, Button } from "@mui/material";
import TextInput from "../toolbox/TextInput";

const CategoryEdit = ({ category, onSubmit, onChange, errors }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      autoComplete="off"
    >
      <h2>{category.id ? "EDIT" : "ADD"}</h2>

      <TextInput
        name="categoryName"
        value={category.categoryName || ""}
        placeholder={category.categoryName || ""}
        label="Category Name"
        error={!!errors.categoryName}
        helperText={errors.categoryName}
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
export default CategoryEdit;
