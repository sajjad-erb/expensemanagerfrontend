import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
	reducerPath: 'transactionApi',
	tagTypes: ["transaction"],
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
		getTransactions: builder.query({
			query: () => ({
				url: `/transactions`,
				method: "GET",
			}),
			providesTags: ["transaction"]
		}),
		listTransaction: builder.query({
			query: (page = 1) => ({
				url: `/transactions?page=${page}`
			}),
			providesTags: ["transaction"]
		}),
		addTransactions: builder.mutation({
			query: (transaction) => ({
				url: `/transactions`,
				method: "POST",
				body: transaction
			}),
			invalidatesTags: ["transaction"]
		}),
		deleteTransactions: builder.mutation({
			query: (id) => {
				return {
					url: `/transactions/${id}`,
					method: "DELETE",
				}
			},
			invalidatesTags: ["transaction"]
		}),
		updateTransactions: builder.mutation({
			query: (transaction) => ({
				url: `/transactions/${transaction.id}`,
				method: "PATCH",
				body: transaction
			}),
			invalidatesTags: ["transaction"]
		})
	})
})

export const { useGetTransactionsQuery, useListTransactionQuery, useAddTransactionsMutation, useDeleteTransactionsMutation, useUpdateTransactionsMutation } = transactionApi