import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CartItem from "./CartItem";

import { fetchCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";

function Cart() {
  const dispatch = useDispatch();

  const { cart, loading } = useSelector(
  (state) => state.cart
);

const totalAmount = cart.reduce(
  (sum, item) =>
    sum + (item.productID?.price || 0) * item.quantity,
  0
);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    const result = await dispatch(placeOrder());

    if (placeOrder.fulfilled.match(result)) {
      toast.success("Order placed successfully");
      dispatch(fetchCart());
    } else {
      toast.error(result.error.message);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">My Cart</h2>

      {cart.map((item) => (
        <CartItem
          key={item._id}
          item={item}
        />
      ))}

      <div className="card shadow-sm p-4 mt-4">

        <h4 className="text-end">
          Total Amount:
          <span className="text-success ms-2">
            ₹{totalAmount}
          </span>
        </h4>

        <div className="text-end mt-3">
          <button
            className="btn btn-success btn-lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>

      </div>

    </div>
  );
}

export default Cart;