import ProductItem from "./ProductItem";
import { useGetFeaturedProductsQuery } from "../redux/productsApi";

function Home() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetFeaturedProductsQuery();

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Featured Products
      </h2>

      <div className="row">
        {products.length === 0 ? (
          <h4 className="text-center">
            No Featured Products
          </h4>
        ) : (
          products.map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={product._id}
            >
              <ProductItem product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;