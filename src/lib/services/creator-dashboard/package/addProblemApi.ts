// import { baseApi } from "../../baseApi";

// interface ProblemResponse {
//   id: number;
//   title: string;
//   difficulty: "EASY" | "MEDIUM" | "HARD";
//   tags: string[];
// }

// interface BadgeResponse {
//   id: number;
//   name: string;
//   description: string;
//   icon_url: string;
//   created_at: string;
//   is_deleted: boolean;
//   is_verified: boolean;
//   author: string;
//   status: "PENDING" | "APPROVED";
// }

// interface AddProblemResponse {
//   id: number;
//   name: string;
//   description: string;
//   problems: ProblemResponse[];
//   status: "PENDING" | "APPROVED";
//   author: string;
//   badgesResponse: BadgeResponse | null;
// }

// interface AddProblemRequest {
//   packageName: string;  // Changed from packageId
//   problemIds: number[];
// }

// export const addProblemApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     addProblemsToPackage: builder.mutation<AddProblemResponse, AddProblemRequest>({
//       query: ({ packageName, problemIds }) => {
//         const requestBody = {
//           package_name: packageName,  // Convert to snake_case
//           problem_ids: problemIds     // Convert to snake_case
//         };
        
//         console.log('=== API REQUEST DEBUG ===');
//         console.log('Package Name:', packageName);
//         console.log('Problem IDs:', problemIds);
//         console.log('Request Body (snake_case):', requestBody);
//         console.log('========================');
        
//         return {
//           url: `packages/add-problems`,
//           method: 'PUT',
//           body: requestBody
//         };
//       },
//       transformErrorResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== API ERROR DEBUG ===');
//         console.log('Response:', JSON.stringify(response, null, 2));
//         console.log('Meta:', JSON.stringify(meta, null, 2));
//         console.log('Request Args:', JSON.stringify(arg, null, 2));
//         console.log('Response Status:', meta?.response?.status);
//         console.log('======================');
//         return response;
//       },
//       transformResponse: (response: any) => {
//         console.log('=== API SUCCESS DEBUG ===');
//         console.log('Success Response:', JSON.stringify(response, null, 2));
//         console.log('========================');
//         return response;
//       },
//       invalidatesTags: (result, error) => [
//         { type: 'Packages', id: result?.id },
//         { type: 'Packages', id: 'LIST' }
//       ],
//     }),
//   }),
// });

// export const { useAddProblemsToPackageMutation } = addProblemApi;

import { baseApi } from "../../baseApi";

interface ProblemResponse {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

interface BadgeResponse {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
  status: "PENDING" | "APPROVED";
}

interface AddProblemResponse {
  id: number;
  name: string;
  description: string;
  problems: ProblemResponse[];
  status: "PENDING" | "APPROVED";
  author: string;
  badgesResponse: BadgeResponse | null;
}

interface AddProblemRequest {
  packageName: string;  // Changed from packageId
  problemIds: number[];
}

// Define types for transform functions
// interface ErrorResponse {
//   status?: number;
//   data?: unknown;
// }

// interface ResponseMeta {
//   response?: {
//     status?: number;
//   };
// }

// interface TransformArgs {
//   packageName: string;
//   problemIds: number[];
// }

export const addProblemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProblemsToPackage: builder.mutation<AddProblemResponse, AddProblemRequest>({
      query: ({ packageName, problemIds }) => {
        const requestBody = {
          package_name: packageName,  // Convert to snake_case
          problem_ids: problemIds     // Convert to snake_case
        };
        
        console.log('=== API REQUEST DEBUG ===');
        console.log('Package Name:', packageName);
        console.log('Problem IDs:', problemIds);
        console.log('Request Body (snake_case):', requestBody);
        console.log('========================');
        
        return {
          url: `packages/add-problems`,
          method: 'PUT',
          body: requestBody
        };
      },
      // transformErrorResponse: (response: ErrorResponse, meta: ResponseMeta, arg: TransformArgs) => {
      //   console.log('=== API ERROR DEBUG ===');
      //   console.log('Response:', JSON.stringify(response, null, 2));
      //   console.log('Meta:', JSON.stringify(meta, null, 2));
      //   console.log('Request Args:', JSON.stringify(arg, null, 2));
      //   console.log('Response Status:', meta?.response?.status);
      //   console.log('======================');
      //   return response;
      // },
      transformResponse: (response: AddProblemResponse) => {
        console.log('=== API SUCCESS DEBUG ===');
        console.log('Success Response:', JSON.stringify(response, null, 2));
        console.log('========================');
        return response;
      },
      invalidatesTags: (result) => [
        { type: 'Packages', id: result?.id },
        { type: 'Packages', id: 'LIST' }
      ],
    }),
  }),
});

export const { useAddProblemsToPackageMutation } = addProblemApi;