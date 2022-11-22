import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
    reducerPath: 'walletApi',
    tagTypes: ["wallet"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1",
        prepareHeaders: (headers, { getState }) => {

            const token = getState().auth.token;
            const client = getState().auth.client;
            const uid = getState().auth.uid;

            if (token && client && uid) {
                headers.set("access-token", `${token}`);
                headers.set("client", `${client}`);
                headers.set("uid", `${uid}`);
            }
            return headers;
        },

    }),
    refetchOnMountOrArgChange: 2,
    endpoints: (builder) => ({
        getwallets: builder.query({
            query: () => ({
                url: `/wallets`,
                method: "GET",
            }),
            providesTags: ["wallet"]
        })
    })
})

export const { useGetwalletsQuery } = walletApi