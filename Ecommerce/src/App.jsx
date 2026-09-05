import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "./redux/authSlice";
import { fetchCart } from "./redux/cartSlice";


function App() {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );


    // Check HttpOnly cookie when app starts
    useEffect(() => {

        dispatch(getCurrentUser());

    }, [dispatch]);


    // Fetch cart after authentication is restored
    useEffect(() => {

        if (isAuthenticated) {
            dispatch(fetchCart());
        }

    }, [isAuthenticated, dispatch]);


    return (
        <Router>

            <NavBar />

            <Routes>

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route
                    path="/shop"
                    element={<Products />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/add-product"
                    element={<AddProduct />}
                />

            </Routes>

        </Router>
    );
}

export default App;