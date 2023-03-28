import React from "react";

import CategoryList from "../category/CategoryList";
import ProductList from "../product/ProductList";
import AuthorItems from "../author/AuthorItems";
import PublisherItems from "../publisher/PublisherItems";

export default function Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 ">
          <CategoryList />
          <AuthorItems />
          <PublisherItems />
        </div>

        <div className="col-lg-9 ">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
