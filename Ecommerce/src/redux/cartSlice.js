
import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";


const API = "http://localhost:3200/api/cartItems";


// =====================================================
// FETCH CART
// =====================================================

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",

    async () => {

        const response = await fetch(API, {

            method: "GET",

            // Send HttpOnly JWT cookie
            credentials: "include"
        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to fetch cart"
            );
        }


        return data;
    }
);


// =====================================================
// ADD TO CART
// =====================================================

export const addToCart = createAsyncThunk(
    "cart/addToCart",

    async (
        { productID, quantity, size },
        { dispatch }
    ) => {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            // Send HttpOnly JWT cookie
            credentials: "include",

            body: JSON.stringify({
                productID,
                quantity,
                size
            })
        });


        const data = await response.text();


        if (!response.ok) {

            throw new Error(data);
        }


        // Refresh cart after adding
        await dispatch(fetchCart());


        return data;
    }
);


// =====================================================
// INCREMENT
// =====================================================

export const increment = createAsyncThunk(
    "cart/increment",

    async (
        { productID, size },
        { dispatch }
    ) => {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            // Send HttpOnly JWT cookie
            credentials: "include",

            body: JSON.stringify({

                productID,

                quantity: 1,

                size
            })
        });


        const data = await response.text();


        if (!response.ok) {

            throw new Error(data);
        }


        // Refresh cart
        await dispatch(fetchCart());


        return data;
    }
);


// =====================================================
// DECREMENT
// =====================================================

export const decrement = createAsyncThunk(
    "cart/decrement",

    async (
        { productID, size },
        { dispatch }
    ) => {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            // Send HttpOnly JWT cookie
            credentials: "include",

            body: JSON.stringify({

                productID,

                quantity: -1,

                size
            })
        });


        const data = await response.text();


        if (!response.ok) {

            throw new Error(data);
        }


        // Refresh cart
        await dispatch(fetchCart());


        return data;
    }
);


// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {

    cart: [],

    loading: false,

    error: null
};


// =====================================================
// SLICE
// =====================================================

const cartSlice = createSlice({

    name: "cart",

    initialState,


    reducers: {

        clearCart(state) {

            state.cart = [];

        }
    },


    extraReducers: (builder) => {

        builder


            // =================================================
            // FETCH CART
            // =================================================

            .addCase(
                fetchCart.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )


            .addCase(
                fetchCart.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.cart = action.payload;
                }
            )


            .addCase(
                fetchCart.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.error.message;
                }
            )


            // =================================================
            // ADD TO CART
            // =================================================

            .addCase(
                addToCart.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )


            .addCase(
                addToCart.fulfilled,
                (state) => {

                    state.loading = false;
                }
            )


            .addCase(
                addToCart.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.error.message;
                }
            )


            // =================================================
            // INCREMENT
            // =================================================

            .addCase(
                increment.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )


            .addCase(
                increment.fulfilled,
                (state) => {

                    state.loading = false;
                }
            )


            .addCase(
                increment.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.error.message;
                }
            )


            // =================================================
            // DECREMENT
            // =================================================

            .addCase(
                decrement.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )


            .addCase(
                decrement.fulfilled,
                (state) => {

                    state.loading = false;
                }
            )


            .addCase(
                decrement.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.error.message;
                }
            );

    }
});


export const {
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer;

