import React from "react";
import { Box, Button } from "@mui/material";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";
import FileInput from "../toolbox/FileInput";
import TextNumberInput from "../toolbox/TextNumberInput";

const ProductEdit = ({
  categories,
  authors,
  publishers,
  product,
  onSubmit,
  onChange,
  errors,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      autoComplete="off"
    >
      <h2>{product.id ? "EDIT" : "ADD"}</h2>

      <TextInput
        name="productName"
        value={product.productName || ""}
        label="Product Name"
        error={!!errors.productName}
        helperText={errors.productName}
        onChange={onChange}
      />
      <TextInput
        name="quantityPerUnit"
        value={product.quantityPerUnit || ""}
        placeholder={product.quantityPerUnit}
        label="Quantity Per Unit"
        onChange={onChange}
      />
      <TextInput
        name="paperType"
        value={product.paperType || ""}
        placeholder={product.paperType}
        label="Paper Type"
        onChange={onChange}
      />

      <SelectInput
        name="authorId"
        label="Authors"
        value={product.authorId || ""}
        defaultOption="Select"
        options={authors.map((author) => ({
          value: author.id,
          text: author.authorName,
        }))}
        onChange={onChange}
      />
      <SelectInput
        name="publisherId"
        label="Publishers"
        value={product.publisherId || ""}
        defaultOption="Select"
        options={publishers.map((publisher) => ({
          value: publisher.id,
          text: publisher.publisherName,
        }))}
        onChange={onChange}
      />
      <SelectInput
        name="categoryId"
        label="Categories"
        value={product.categoryId || ""}
        defaultOption="Select"
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
      />
      <TextNumberInput
        name="unitPrice"
        value={product.unitPrice || ""}
        label="Unit Price"
        onChange={onChange}
      />
      <TextNumberInput
        name="unitsInStock"
        value={product.unitsInStock || ""}
        label="Units In Stock"
        onChange={onChange}
      />

      <FileInput
        name="imageUrl"
        value={product.imageUrl || ""}
        label="Select Image"
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
export default ProductEdit;
