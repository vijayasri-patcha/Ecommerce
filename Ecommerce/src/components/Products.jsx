import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/productsApi";

import ProductItem from "./ProductItem";
import PriceFilter from "./PriceFilter";

function Products() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
console.log(searchParams);

  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery({
    category,
    search,
    minPrice,
    maxPrice,
  });

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h3>
          {error?.data || error?.error || "Something went wrong"}
        </h3>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* Price Filter */}
        <div className="col-lg-3 mb-4">
          <PriceFilter />
        </div>

        {/* Products */}
        <div className="col-lg-9">
          <div className="row">

            {products.length === 0 ? (
              <div className="text-center">
                <h4>No Products Found</h4>
              </div>
            ) : (
              products.map((product) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 mb-4"
                  key={product._id}
                >
                  <ProductItem product={product} />
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Products;