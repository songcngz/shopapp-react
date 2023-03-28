import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectInput = ({
  name,
  value,
  label,
  options,
  defaultOption,
  error,
  onChange,
}) => {
  return (
    <Box
    
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          name={name}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {error && (
        <div>
          {" "}
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={error}
            renderValue={(value) => `⚠️  - ${value}`}
          ></Select>
        </div>
      )}
    </Box>
  );
};
export default SelectInput;
