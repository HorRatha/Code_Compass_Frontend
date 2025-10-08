// import { baseApi } from "../../baseApi";

// // Define the response type for delete operation
// export interface DeleteProblemResponse {
//   message?: string;
//   success?: boolean;
//   id?: number;
//   status?: string;
// }

// export const deletedProblemsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     deleteProblem: builder.mutation<DeleteProblemResponse, { problemId: number }>({
//       query: ({ problemId }) => {
//         console.log('=== DELETE API CALL ===')
//         console.log('Problem ID:', problemId)
//         console.log('URL will be:', `problems/${problemId}/delete`)
        
//         return {
//           url: `problems/${problemId}/delete`,
//           method: 'DELETE',
//         }
//       },
//       transformResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== DELETE API RESPONSE ===')
//         console.log('Raw response:', response)
//         console.log('Meta:', meta)
//         console.log('Status:', meta?.response?.status)
//         console.log('Args:', arg)
        
//         // Handle different response formats
//         if (response === null || response === undefined) {
//           return { success: true, message: 'Deleted successfully' }
//         }
        
//         return response
//       },
//       transformErrorResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== DELETE API ERROR ===')
//         console.log('Error response:', response)
//         console.log('Meta:', meta)
//         console.log('Status:', meta?.response?.status)
//         console.log('Args:', arg)
        
//         return response
//       },
//       invalidatesTags: (result, error, { problemId }) => {
//         console.log('=== DELETE API CACHE INVALIDATION ===')
//         console.log('Result:', result)
//         console.log('Error:', error)
//         console.log('Problem ID:', problemId)
        
//         if (!error) {
//           return [
//             { type: 'Problems', id: problemId },
//             { type: 'Problems' }
//           ]
//         }
//         return []
//       },
//       onQueryStarted: async (arg, { queryFulfilled }) => {
//         console.log('=== DELETE QUERY STARTED ===')
//         console.log('Arguments:', arg)
        
//         try {
//           const result = await queryFulfilled
//           console.log('=== DELETE QUERY FULFILLED ===')
//           console.log('Result:', result)
//         } catch (error: any) {
//           console.log('=== DELETE QUERY REJECTED ===')
//           console.log('Error:', error)
//           console.log('Error data:', error?.data)
//           console.log('Error status:', error?.status)
//         }
//       }
//     }),
//   }),
//   overrideExisting: true, // Add this to allow overriding existing endpoint
// });

// export const { useDeleteProblemMutation } = deletedProblemsApi;

import { baseApi } from "../../baseApi";

// Define the response type for delete operation
export interface DeleteProblemResponse {
  message?: string;
  success?: boolean;
  id?: number;
  status?: string;
}

// Define types for transform functions
// interface ResponseMeta {
//   response?: {
//     status?: number;
//   };
// }

// interface TransformArgs {
//   problemId: number;
// }

// interface ErrorResponse {
//   status?: number;
//   data?: unknown;
// }

interface QueryError {
  data?: unknown;
  status?: number;
}

export const deletedProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteProblem: builder.mutation<DeleteProblemResponse, { problemId: number }>({
      query: ({ problemId }) => {
        console.log('=== DELETE API CALL ===')
        console.log('Problem ID:', problemId)
        console.log('URL will be:', `problems/${problemId}/delete`)
        
        return {
          url: `problems/${problemId}/delete`,
          method: 'DELETE',
        }
      },
      // transformResponse: (response: DeleteProblemResponse | null, meta: ResponseMeta, arg: TransformArgs) => {
      //   console.log('=== DELETE API RESPONSE ===')
      //   console.log('Raw response:', response)
      //   console.log('Meta:', meta)
      //   console.log('Status:', meta?.response?.status)
      //   console.log('Args:', arg)
        
      //   // Handle different response formats
      //   if (response === null || response === undefined) {
      //     return { success: true, message: 'Deleted successfully' }
      //   }
        
      //   return response
      // },
      // transformErrorResponse: (response: ErrorResponse, meta: ResponseMeta, arg: TransformArgs) => {
      //   console.log('=== DELETE API ERROR ===')
      //   console.log('Error response:', response)
      //   console.log('Meta:', meta)
      //   console.log('Status:', meta?.response?.status)
      //   console.log('Args:', arg)
        
      //   return response
      // },
      invalidatesTags: (result, error, { problemId }) => {
        console.log('=== DELETE API CACHE INVALIDATION ===')
        console.log('Result:', result)
        console.log('Error:', error)
        console.log('Problem ID:', problemId)
        
        if (!error) {
          return [
            { type: 'Problems', id: problemId },
            { type: 'Problems' }
          ]
        }
        return []
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        console.log('=== DELETE QUERY STARTED ===')
        console.log('Arguments:', arg)
        
        try {
          const result = await queryFulfilled
          console.log('=== DELETE QUERY FULFILLED ===')
          console.log('Result:', result)
        } catch (error: unknown) {
          console.log('=== DELETE QUERY REJECTED ===')
          console.log('Error:', error)
          const queryError = error as QueryError;
          console.log('Error data:', queryError?.data)
          console.log('Error status:', queryError?.status)
        }
      }
    }),
  }),
  overrideExisting: true, // Add this to allow overriding existing endpoint
});

export const { useDeleteProblemMutation } = deletedProblemsApi;