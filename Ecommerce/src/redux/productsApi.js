
import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({

    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({

        baseUrl: "http://localhost:3200/api/products",

        // IMPORTANT:
        // Send HttpOnly cookie with every request
        credentials: "include"

    }),

    tagTypes: ["Products", "Product"],


    endpoints: (builder) => ({


        // ====================
        // GET ALL PRODUCTS
        // ====================

        getProducts: builder.query({

            query: ({
                minPrice,
                maxPrice,
                category,
                search
            }) => {

                const params = new URLSearchParams();

                if (minPrice) {
                    params.append(
                        "minPrice",
                        minPrice
                    );
                }

                if (maxPrice) {
                    params.append(
                        "maxPrice",
                        maxPrice
                    );
                }

                if (category) {
                    params.append(
                        "category",
                        category
                    );
                }

                if (search) {
                    params.append(
                        "search",
                        search
                    );
                }

                return `/filter?${params.toString()}`;
            },

            providesTags: ["Products"]
        }),


        // ====================
        // FEATURED PRODUCTS
        // ====================

        getFeaturedProducts: builder.query({

            query: () => "/featured",

            providesTags: ["Products"]
        }),


        // ====================
        // GET PRODUCT BY ID
        // ====================

        getProductById: builder.query({

            query: (id) => `/${id}`,

            providesTags: (result, error, id) => [
                {
                    type: "Product",
                    id
                }
            ]
        }),


        // ====================
        // RATE PRODUCT
        // ====================

        rateProduct: builder.mutation({

            query: ({
                productID,
                rating
            }) => ({

                url: "/rate",

                method: "POST",

                body: {
                    productID,
                    rating
                }
            }),

            invalidatesTags: (
                result,
                error,
                { productID }
            ) => [
                {
                    type: "Product",
                    id: productID
                },
                "Products"
            ]
        }),


        // ====================
        // ADD PRODUCT
        // ====================

        addProduct: builder.mutation({

            query: (formData) => ({

                url: "/",

                method: "POST",

                body: formData
            }),

            invalidatesTags: ["Products"]
        })

    })
});


export const {
    useGetProductsQuery,
    useGetFeaturedProductsQuery,
    useGetProductByIdQuery,
    useRateProductMutation,
    useAddProductMutation
} = productsApi;

