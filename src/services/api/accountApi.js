import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    tagTypes: ["Account"],
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
        getAccounts: builder.query({
            query: () => ({
                url: `/accounts`,
                method: "GET",
            }),
            providesTags: ["Account"]
        }),
        addAccounts: builder.mutation({
            query: (account) => ({
                url: `/accounts`,
                method: "POST",
                body: account
            }),
            invalidatesTags: ["Account"]
        }),
        deleteAccounts: builder.mutation({
            query: (id) => {
                return {
                    url: `/accounts/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Account"]
        }),
        updateAccounts: builder.mutation({
            query: (account) => ({
                url: `/accounts/${account.id}`,
                method: "PATCH",
                body: account
            }),
            invalidatesTags: ["Account"]
        })
    })
})

export const { useGetAccountsQuery, useAddAccountsMutation, useDeleteAccountsMutation, useUpdateAccountsMutation } = accountApi