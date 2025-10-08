// import { baseApi } from "../../baseApi";

// export interface Problem {
//   id: number;
//   title: string;
//   difficulty: "EASY" | "MEDIUM" | "HARD";
//   tags: string[];
// }

// export const unverifiedProblemsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Use a unique name to avoid conflicts
//     fetchUnverifiedProblems: builder.query<Problem[], void>({
//       query: () => ({
//         url: `problems/unverified`,
//         method: 'GET',
//       }),
//       providesTags: ['UnverifiedProblems'], // Use a unique tag too
//       // Add error handling and logging
//       transformErrorResponse: (response: any) => {
//         console.error('Unverified problems API error:', response);
//         return response;
//       },
//       // Add response transformation and logging
//       transformResponse: (response: any) => {
//         console.log('Unverified problems API response:', response);
//         return response;
//       },
//     }),
//   }),
//   overrideExisting: false,
// });

// // Export the hook with the new name
// export const { useFetchUnverifiedProblemsQuery } = unverifiedProblemsApi;

import { baseApi } from "../../baseApi";

export interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

// Define error response type
interface ErrorResponse {
  status: number;
  data: {
    message?: string;
    error?: string;
  };
}

export const unverifiedProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Use a unique name to avoid conflicts
    fetchUnverifiedProblems: builder.query<Problem[], void>({
      query: () => ({
        url: `problems/unverified`,
        method: 'GET',
      }),
      providesTags: ['Problems'], // Use a unique tag too
      // Add error handling and logging
      transformErrorResponse: (response: ErrorResponse) => {
        console.error('Unverified problems API error:', response);
        return response;
      },
      // Add response transformation and logging
      transformResponse: (response: Problem[]) => {
        console.log('Unverified problems API response:', response);
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

// Export the hook with the new name
export const { useFetchUnverifiedProblemsQuery } = unverifiedProblemsApi;