import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductItem({ product }) {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <div className="card h-100 shadow-sm border-0 position-relative">

      {product.stock <= 0 && (
        <span className="badge bg-danger position-absolute top-0 end-0 m-2">
          Out of Stock
        </span>
      )}

      <img
        src={
          product.imageUrl
            ? `http://localhost:3200/uploads/${product.imageUrl}`
            : "/images/no-image.png"
        }
        className="card-img-top"
        alt={product.name}
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {product.name}
        </h5>

        <p className="text-warning mb-1">
          ⭐ {product.averageRating?.toFixed(1) || "0.0"}
        </p>

        <h5 className="text-success fw-bold">
          ₹{product.price}
        </h5>

        <p className="text-muted small">
          {product.des?.length > 60
            ? product.des.substring(0, 60) + "..."
            : product.des}
        </p>

       <Link
  to={
    isAuthenticated
      ? `/products/${product._id}`
      : "/login"
  }
  className="btn btn-primary mt-auto"
>
  View Details
</Link>

      </div>
    </div>
  );
}

export default ProductItem;