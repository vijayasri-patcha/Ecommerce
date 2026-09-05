import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

const API = "http://localhost:3200/api/user";

// =====================================================
// SIGNUP
// =====================================================

export const signupUser = createAsyncThunk(
    "auth/signupUser",

    async (userData) => {

        const response = await fetch(
            `${API}/signup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Signup failed"
            );
        }

        return data;
    }
);


// =====================================================
// LOGIN
// =====================================================

export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (userData) => {

        const response = await fetch(
            `${API}/signin`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData),

                // Browser receives/stores HttpOnly cookie
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Login failed"
            );
        }

        return data;
    }
);


// =====================================================
// GET CURRENT USER
// =====================================================

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",

    async (_, { rejectWithValue }) => {

        try {

            const response = await fetch(
                `${API}/me`,
                {
                    method: "GET",

                    // Browser automatically sends cookie
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(
                    data.message || "Not authenticated"
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
// LOGOUT
// =====================================================

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",

    async (_, { rejectWithValue }) => {

        try {

            const response = await fetch(
                `${API}/signout`,
                {
                    method: "POST",

                    // Sends HttpOnly cookie
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(
                    data.message || "Logout failed"
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

    // User information only
    user: null,

    // No JWT in Redux
    token: null,

    isAuthenticated: false,

    loading: false,

    error: null
};


// =====================================================
// SLICE
// =====================================================

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // =================================================
            // SIGNUP
            // =================================================

            .addCase(
                signupUser.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                signupUser.fulfilled,
                (state) => {

                    state.loading = false;
                }
            )

            .addCase(
                signupUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        action.error.message;
                }
            )


            // =================================================
            // LOGIN
            // =================================================

            .addCase(
                loginUser.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    // JWT remains inside HttpOnly cookie
                    state.user =
                        action.payload.user;

                    state.isAuthenticated = true;

                    state.error = null;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.user = null;

                    state.isAuthenticated = false;

                    state.error =
                        action.payload ||
                        action.error.message;
                }
            )


            // =================================================
            // GET CURRENT USER
            // =================================================

            .addCase(
                getCurrentUser.pending,
                (state) => {

                    state.error = null;
                }
            )

            .addCase(
                getCurrentUser.fulfilled,
                (state, action) => {

                    state.user =
                        action.payload;

                    state.isAuthenticated = true;

                    state.error = null;
                }
            )

            .addCase(
                getCurrentUser.rejected,
                (state) => {

                    state.user = null;

                    state.isAuthenticated = false;

                    state.error = null;
                }
            )


            // =================================================
            // LOGOUT
            // =================================================

            .addCase(
                logoutUser.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                logoutUser.fulfilled,
                (state) => {

                    state.loading = false;

                    state.user = null;

                    state.isAuthenticated = false;

                    state.error = null;
                }
            )

            .addCase(
                logoutUser.rejected,
                (state, action) => {

                    state.loading = false;

                    // Clear frontend state
                    state.user = null;

                    state.isAuthenticated = false;

                    state.error =
                        action.payload ||
                        action.error.message;
                }
            );
    }
});

export default authSlice.reducer;