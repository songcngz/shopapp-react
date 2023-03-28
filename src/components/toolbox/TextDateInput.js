import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import Box from "@mui/material/Box";
import tr from "date-fns/locale/tr";

export default function TextDateInput({ label, value, placeholder }) {
  const [startDate, setStartDate] = useState();
  registerLocale("tr", tr);

  return (
    <Box
    
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      autoComplete="off"
    >
      <DatePicker
        selected={startDate}
        label={label}
        locale="tr"
        onChange={(date) => setStartDate(date)}
        dateFormat="d MMMM  yyyy"
        placeholderText={placeholder}
        withPortal
        maxDate={new Date()}
        isClearable
        showYearDropdown
        showMonthDropdown
        scrollableMonthYearDropdown
      />
    </Box>
  );
}
