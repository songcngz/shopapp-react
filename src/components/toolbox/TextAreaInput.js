import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextAreaInput({
  name,
  value,
  label,
  placeholder,
  onChange,
}) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          label={label}
          multiline
          maxRows={20}
          onChange={onChange}
        />
      </div>
    </Box>
  );
}
