import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/userPosts" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "",
      providesTags: (result, error, arg) => (result ? [...result.map(({ id }) => ({ type: "Posts", id })), "Posts"] : ["Posts"]),
    }),
    addSinglePost: builder.mutation({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: id,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    updatePost: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        console.log(id);
        return {
          url: id,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
  }),
});
export const { useGetAllPostsQuery, useAddSinglePostMutation, useDeletePostMutation, useUpdatePostMutation } = postApi;
