import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/userData" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => "",
      providesTags: (result, error, arg) => (result ? [...result.map(({ id }) => ({ type: "User", id })), "User"] : ["User"]),
    }),
    addSinglePost: builder.mutation({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetAllDataQuery, useAddSinglePostMutation } = dataApi;
