// import { baseApi } from "../../baseApi";

// export const deletePackageApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     deletePackage: builder.mutation<void, { id: number }>({
//       query: ({ id }) => ({
//         url: `packages/${id}/delete`,
//         method: 'DELETE',
//       }),
//       // This transforms the response before RTK Query tries to parse it
//       transformResponse: (response: any, meta: any) => {
//         // For 204 No Content, just return undefined
//         return undefined;
//       },
//       // This transforms errors to handle 204 as success
//       transformErrorResponse: (response: any, meta: any) => {
//         // If it's actually a 204, don't treat it as an error
//         if (meta?.response?.status === 204) {
//           return null;
//         }
//         return response;
//       },
//       invalidatesTags: () => [
//         { type: 'Packages' }
//       ],
//     }),
//   }),
// });

// export const { useDeletePackageMutation } = deletePackageApi;

import { baseApi } from "../../baseApi";

export const deletePackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletePackage: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `packages/${id}/delete`,
        method: 'DELETE',
      }),
      // This transforms the response before RTK Query tries to parse it
      transformResponse: () => {
        // For 204 No Content, just return undefined
        return undefined;
      },
      // This transforms errors to handle 204 as success
      // transformErrorResponse: (response: unknown, meta: { response?: { status?: number } }) => {
      //   // If it's actually a 204, don't treat it as an error
      //   if (meta?.response?.status === 204) {
      //     return null;
      //   }
      //   return response;
      // },
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useDeletePackageMutation } = deletePackageApi;