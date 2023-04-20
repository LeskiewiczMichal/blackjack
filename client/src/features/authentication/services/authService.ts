// import { AuthReducerState } from "types.d";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:9000/users",
//     prepareHeaders: (headers, { getState }) => {
     
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getUserDetails: builder.query({
//       query: () => ({
//         url: "users",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useGetUserDetailsQuery } = authApi;
