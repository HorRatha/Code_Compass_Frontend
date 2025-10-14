// import { baseApi } from "../../baseApi";

// // Request type based on your API documentation
// export interface ModifyBadgeRequest {
//   name: string;
//   description: string;
//   icon_url: string;
// }

// // Response type - API returns plain text message
// export type ModifyBadgeResponse = string;

// export const modifyBadgeApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     modifyBadge: builder.mutation<ModifyBadgeResponse, { id: number } & ModifyBadgeRequest>({
//       query: ({ id, ...body }) => ({
//         url: `badges/${id}`,
//         method: 'PUT',
//         body,
//       }),
//       transformResponse: (response: any) => {
//         // If response is already a string, return it
//         if (typeof response === 'string') {
//           return response;
//         }
//         // If response is an object with a message, return the message
//         if (response?.message) {
//           return response.message;
//         }
//         // Otherwise return the whole response as string
//         return String(response);
//       },
//       invalidatesTags: (result, error, { id }) => [
//         { type: 'Badges', id },
//         { type: 'Badges' }
//       ],
//     }),
//   }),
// });

// export const { useModifyBadgeMutation } = modifyBadgeApi;

import { baseApi } from "../../baseApi";

interface ModifyBadgeRequest {
  name?: string;
  description?: string;
  icon_url?: string;
}

interface ModifyBadgeParams {
  id: number;
  data: ModifyBadgeRequest;
}

export const modifyBadgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyBadge: builder.mutation<string, ModifyBadgeParams>({
      query: ({ id, data }) => ({
        url: `badges/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Badges' },
        { type: 'Badges', id }
      ],
    }),
  }),
});

export const { useModifyBadgeMutation } = modifyBadgeApi;