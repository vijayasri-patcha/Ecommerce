
import { useState, useEffect } from "react";
import {
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";


function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    const { user } = useSelector(
        (state) => state.auth
    );

    const cart = useSelector(
        (state) => state.cart.cart
    );

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );


    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );


    useEffect(() => {

        setSearch(
            searchParams.get("search") || ""
        );

    }, [searchParams]);


    // =========================
    // SEARCH
    // =========================

    const handleSearch = (e) => {

        e.preventDefault();

        const params = new URLSearchParams(
            searchParams
        );

        if (search.trim()) {

            params.set(
                "search",
                search.trim()
            );

        } else {

            params.delete("search");
        }

        navigate(
            `/shop?${params.toString()}`
        );
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = async () => {

        // Call backend.
        // Backend removes the HttpOnly JWT cookie.
        await dispatch(logoutUser());

        // Clear cart from Redux.
        dispatch(clearCart());

        // Navigate to login.
        navigate("/login");
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                {/* =========================
                    LOGO
                ========================= */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/home"
                >
                    E-Commerce
                </Link>


                {/* =========================
                    TOGGLER
                ========================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    {/* =========================
                        NAV LINKS
                    ========================= */}

                    <ul className="navbar-nav me-auto">

                        {/* HOME */}

                        <li className="nav-item">

                            {user?.type === "Customer" && (

                                <Link
                                    className="nav-link"
                                    to="/home"
                                >
                                    Home
                                </Link>

                            )}

                        </li>


                        {/* ABOUT */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/about"
                            >
                                About
                            </Link>

                        </li>


                        {/* SHOP */}

                        <li className="nav-item">

                            {user?.type === "Customer" && (

                                <Link
                                    className="nav-link"
                                    to="/shop"
                                >
                                    Shop
                                </Link>

                            )}

                        </li>


                        {/* KIDS WEAR */}

                        <li className="nav-item">

                            {user?.type === "Customer" && (

                                <Link
                                    className="nav-link"
                                    to="/shop?category=kids%20wear"
                                >
                                    Kids Wear
                                </Link>

                            )}

                        </li>


                        {/* MENS WEAR */}

                        <li className="nav-item">

                            {user?.type === "Customer" && (

                                <Link
                                    className="nav-link"
                                    to="/shop?category=Mens%20wear"
                                >
                                    Mens Wear
                                </Link>

                            )}

                        </li>


                        {/* WOMENS WEAR */}

                        <li className="nav-item">

                            {user?.type === "Customer" && (

                                <Link
                                    className="nav-link"
                                    to="/shop?category=womens%20wear"
                                >
                                    Womens Wear
                                </Link>

                            )}

                        </li>

                    </ul>


                    {/* =========================
                        SEARCH
                    ========================= */}

                    <form
                        className="d-flex me-3"
                        onSubmit={handleSearch}
                    >

                        {user?.type === "Customer" && (

                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        )}

                        {user?.type === "Customer" && (

                            <button
                                className="btn btn-outline-light"
                                type="submit"
                            >
                                Search
                            </button>

                        )}

                    </form>


                    {/* =========================
                        RIGHT SIDE
                    ========================= */}

                    <div className="d-flex align-items-center">

                        {/* =========================
                            CART
                        ========================= */}

                        {user?.type === "Customer" && (

                            <Link
                                to="/cart"
                                className="text-white me-3 position-relative"
                            >

                                <FaShoppingCart
                                    size={24}
                                />

                                {cart.length > 0 && (

                                    <span
                                        className="
                                            position-absolute
                                            top-0
                                            start-100
                                            translate-middle
                                            badge
                                            rounded-pill
                                            bg-danger
                                        "
                                    >
                                        {cart.length}
                                    </span>

                                )}

                            </Link>

                        )}


                        {/* =========================
                            AUTH BUTTONS
                        ========================= */}

                        {!isAuthenticated ? (

                            <>

                                <Link
                                    to="/signup"
                                    className="btn btn-success me-2"
                                >
                                    Signup
                                </Link>


                                <Link
                                    to="/login"
                                    className="btn btn-primary"
                                >
                                    Login
                                </Link>

                            </>

                        ) : (

                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}


export default NavBar;
