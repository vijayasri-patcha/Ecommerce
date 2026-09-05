import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3200/api/order";


// =====================================================
// PLACE ORDER
// =====================================================

export const placeOrder = createAsyncThunk(
    "order/placeOrder",

    async (_, { rejectWithValue }) => {

        try {

            const response = await fetch(
                API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    // Send HttpOnly cookie
                    credentials: "include"
                }
            );

            const data = await response.text();

            if (!response.ok) {

                return rejectWithValue(
                    data || "Failed to place order"
                );
            }

            return data;

        } catch (error) {

            return rejectWithValue(
                error.message
            );
        }
    }
);


// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {

    loading: false,

    error: null
};


// =====================================================
// SLICE
// =====================================================

const orderSlice = createSlice({

    name: "order",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // ==============================
            // PLACE ORDER - PENDING
            // ==============================

            .addCase(
                placeOrder.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )


            // ==============================
            // PLACE ORDER - SUCCESS
            // ==============================

            .addCase(
                placeOrder.fulfilled,
                (state) => {

                    state.loading = false;
                    state.error = null;
                }
            )


            // ==============================
            // PLACE ORDER - FAILED
            // ==============================

            .addCase(
                placeOrder.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        action.error.message;
                }
            );
    }
});


export default orderSlice.reducer;