import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
    reducerPath: 'groupApi',
    tagTypes: ["Group"],
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
        getGroups: builder.query({
            query: () => ({
                url: `/groups`,
                method: "GET",
            }),
            providesTags: ["Group"]
        }),
        getGroupuser: builder.query({
            query: (Group) => ({
                url: `/groups/${Group.id}/user_groups`,
                method: "GET",
            }),
            providesTags: ["Group"]
        }),
        addGroups: builder.mutation({
            query: (Group) => ({
                url: `/groups`,
                method: "POST",
                body: Group
            }),
            invalidatesTags: ["Group"]
        }),
        deleteGroups: builder.mutation({
            query: (id) => {
                return {
                    url: `/groups/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["group"]
        }),
        updateGroups: builder.mutation({
            query: (Group) => ({
                url: `/groups/${Group.id}`,
                method: "PATCH",
                body: Group
            }),
            invalidatesTags: ["Group"]
        })
    })
})

export const { useGetGroupsQuery, useGetGroupuserQuery , useAddGroupsMutation, useDeleteGroupsMutation, useUpdateGroupsMutation } = groupApi