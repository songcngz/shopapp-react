import React from "react";
import { Typography, MenuItem } from "@mui/material";

import { NavLink } from "react-router-dom";

const pages = [
  {
    id: 1,
    url: "",
    header: "",
    tooltipTitle: "",
  },
];

export default function MenuUser(handleCloseNavMenu) {
  return (
    <>
      {pages.map((page) => (
        <MenuItem key={page.id} onClick={() => handleCloseNavMenu}>
          <NavLink to={page.url} style={{ textDecoration: "none" }}>
            <Typography sx={{ my: 1, mr: 2, color: "white" }}>
              {page.header}
            </Typography>
          </NavLink>
        </MenuItem>
      ))}
    </>
  );
}
