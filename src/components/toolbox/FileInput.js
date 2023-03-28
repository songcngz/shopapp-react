import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const FileInput = ({ name, value, error, onChange, label }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <div>
        <label htmlFor="avatar" class="col-sm-2 col-form-label">
          {label}
        </label>
        <div class="col-sm-10">
          <input type="hidden" htmlFor="avatar" />

          <img src={value} alt="S" width="100" />
          <input type="file" name={name} onChange={onChange} />
        </div>
      </div>

      {error && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {error}
        </div>
      )}
    </Box>
  );
};
export default FileInput;
