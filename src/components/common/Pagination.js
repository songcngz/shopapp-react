import React from "react";

import { Pagination } from "@mui/material";

export default function PaginationComponent({onChange,count}) {

  return (
    <div>
      <div>
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          onChange={onChange}
          count={count}
          color="secondary"
        />
      </div>
    </div>
  );
}
