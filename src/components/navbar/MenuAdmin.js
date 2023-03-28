import React from "react";
import { Typography, MenuItem } from "@mui/material";

import { NavLink } from "react-router-dom";

const pages = [
  {
    id: 1,
    url: "/editproduct",
    header: "EditProduct",
    tooltipTitle: "Open edit product",
  },
  {
    id: 2,
    url: "/editauthor",
    header: "EditAuthor",
    tooltipTitle: "Open edit author",
  },
  {
    id: 3,
    url: "/editpublisher",
    header: "EditPublisher",
    tooltipTitle: "Open edit publisher",
  },
  {
    id: 4,
    url: "/editcategory",
    header: "EditCategory",
    tooltipTitle: "Open edit category",
  },
  {
    id: 5,
    url: "/customer",
    header: "EditCustomer",
    tooltipTitle: "Open edit customer",
  },
];

export default function MenuAdmin(handleCloseNavMenu) {
  return (
    <>
      {pages.map((page) => (
        <MenuItem key={page.id} onClick={() => handleCloseNavMenu}>
          <NavLink to={page.url} style={{ textDecoration: "none" }}>
            <Typography sx={{color: "darkgray" }}>
              {page.header}
            </Typography>
          </NavLink>
        </MenuItem>
      ))}
    </>
  );
}
