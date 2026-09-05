import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  increment,
  decrement,
} from "../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const increaseQuantity = async () => {
    const result = await dispatch(
      increment({
        productID: item.productID._id,
        size: item.size,
      })
    );

    if (increment.fulfilled.match(result)) {
      toast.success("Quantity updated");
    } else {
      toast.error(result.error.message);
    }
  };

  const decreaseQuantity = async () => {
    if (item.quantity === 1) {
      return;
    }

    const result = await dispatch(
      decrement({
        productID: item.productID._id,
        size: item.size,
      })
    );

    if (decrement.fulfilled.match(result)) {
      toast.success("Quantity updated");
    } else {
      toast.error(result.error.message);
    }
  };

  const price = item.productID?.price || 0;
  const total = price * item.quantity;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-md-3">
          <img
            src={`http://localhost:3200/uploads/${item.productID?.imageUrl}`}
            alt={item.productID?.name}
            className="img-fluid rounded-start"
            style={{
              height: "180px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <h5>{item.productID?.name}</h5>

            <p className="mb-1">
              <strong>Size:</strong> {item.size}
            </p>

            <p className="mb-1">
              <strong>Price:</strong> ₹{price}
            </p>

            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={decreaseQuantity}
              >
                -
              </button>

              <span className="mx-3 fw-bold">
                {item.quantity}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <h6 className="text-success">
              Total: ₹{total}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;