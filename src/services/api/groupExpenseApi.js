import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupExpenseApi = createApi({
	reducerPath: 'groupExpenseApi',
	tagTypes: ["groupExpense"],
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
		getgroupExpenses: builder.query({
			query: () => ({
				url: `/group_expenses`,
				method: "GET",
			}),
			providesTags: ["groupExpense"]
		}),
		listgroupExpense: builder.query({
			query: (page = 1) => ({
				url: `/group_expenses?page=${page}`
			}),
			providesTags: ["groupExpense"]
		}),
		addgroupExpenses: builder.mutation({
			query: (groupExpense) => ({
				url: `/group_expenses`,
				method: "POST",
				body: groupExpense
			}),
			invalidatesTags: ["groupExpense"]
		}),
		deletegroupExpenses: builder.mutation({
			query: (id) => {
				return {
					url: `/group_expenses/${id}`,
					method: "DELETE",
				}
			},
			invalidatesTags: ["groupExpense"]
		}),
		updategroupExpenses: builder.mutation({
			query: (groupExpense) => ({
				url: `/group_expenses/${groupExpense.id}`,
				method: "PATCH",
				body: groupExpense
			}),
			invalidatesTags: ["groupExpense"]
		})
	})
})

export const { useGetgroupExpensesQuery, useListgroupExpenseQuery, useAddgroupExpensesMutation, useDeletegroupExpensesMutation, useUpdategroupExpensesMutation } = groupExpenseApi