import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextNumberInput({
  name,
  value,
  label,
  placeholder,
  error,
  helperText,
  onChange,
}) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-number"
          name={name}
          value={value}
          placeholder={placeholder}
          label={label}
          type="number"
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={error}
          helperText={helperText}
        />
      </div>
    </Box>
  );
}
