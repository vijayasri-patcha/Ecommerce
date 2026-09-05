import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetProductByIdQuery,
  useRateProductMutation,
} from "../redux/productsApi";

import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id);

  const [rateProduct] = useRateProductMutation();

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

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3>Product not found.</h3>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const result = await dispatch(
      addToCart({
        productID: product._id,
        quantity: 1,
        size: selectedSize,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success("Added to cart");
    } else {
      toast.error(result.error.message);
    }
  };

  const handleRating = async (rating) => {
    try {
      await rateProduct({
        productID: product._id,
        rating,
      }).unwrap();

      toast.success("Rating submitted");
    } catch (err) {
      toast.error(err.data || err.error || "Rating failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-6">
          <img
            src={`http://localhost:3200/uploads/${product.imageUrl}`}
            className="img-fluid rounded shadow"
            alt={product.name}
          />
        </div>

        <div className="col-md-6">

          <h2>{product.name}</h2>

          <h4 className="text-success">
            ₹{product.price}
          </h4>

          <p className="text-warning">
            ⭐ {product.averageRating?.toFixed(1) || "0.0"}
          </p>

          <p>{product.des}</p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.categories?.map((c) => c.name).join(", ")}
          </p>

          <h5 className="mt-4">Select Size</h5>

          <div className="mb-3">
            {product.sizes?.map((size) => (
              <div
                className="form-check"
                key={size}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id={size}
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) =>
                    setSelectedSize(e.target.value)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor={size}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>

          <h5>Rate this product</h5>

          <div className="mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="btn btn-outline-warning me-2 mb-2"
                onClick={() => handleRating(star)}
              >
                {star} ⭐
              </button>
            ))}
          </div>

          <button
            className="btn btn-success"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;