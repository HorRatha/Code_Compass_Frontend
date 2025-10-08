// import { baseApi } from "../../baseApi";

// interface AddBadgeRequest {
//   packageName: string;
//   badgeName: string;
// }

// interface AddBadgeResponse {
//   message: string;
// }

// export const addBadgeApi = baseApi.injectEndpoints({
//   overrideExisting: true,
//   endpoints: (builder) => ({
//     addBadgeToPackage: builder.mutation<AddBadgeResponse, AddBadgeRequest>({
//       query: ({ packageName, badgeName }) => {
//         const requestBody = {
//           package_name: packageName,
//           badge_name: badgeName
//         };
        
//         console.log('=== ADD BADGE API REQUEST ===');
//         console.log('Package Name:', packageName);
//         console.log('Badge Name:', badgeName);
//         console.log('Request Body:', requestBody);
//         console.log('============================');
        
//         return {
//           url: `badges/add-to-package`,
//           method: 'PUT',
//           body: requestBody,
//           // Force JSON content type
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           // Add response type handling
//           responseHandler: async (response) => {
//             console.log('=== RAW RESPONSE ===');
//             console.log('Response status:', response.status);
//             console.log('Response headers:', response.headers);
//             console.log('Response ok:', response.ok);
            
//             // Log all headers
//             const headers: Record<string, string> = {};
//             response.headers.forEach((value, key) => {
//               headers[key] = value;
//             });
//             console.log('All headers:', headers);
            
//             const contentType = response.headers.get('content-type');
//             console.log('Content-Type:', contentType);
//             console.log('===================');
            
//             // If 401, log it clearly
//             if (response.status === 401) {
//               console.error('⚠️ AUTHENTICATION FAILED - 401 Unauthorized');
//               console.error('Check if NextAuth session is valid and token is being sent');
//               const text = await response.text();
//               console.error('Response body:', text);
//               throw new Error('Authentication failed - please log in again');
//             }
            
//             // Handle plain text response
//             if (contentType && contentType.includes('text/plain')) {
//               const text = await response.text();
//               console.log('Plain text response:', text);
//               return text;
//             }
            
//             // Handle JSON response
//             if (contentType && contentType.includes('application/json')) {
//               const json = await response.json();
//               console.log('JSON response:', json);
//               return json;
//             }
            
//             // Fallback: try to get text
//             const text = await response.text();
//             console.log('Fallback text response:', text);
            
//             // Try to parse as JSON
//             try {
//               const json = JSON.parse(text);
//               console.log('Parsed as JSON:', json);
//               return json;
//             } catch (e) {
//               console.log('Not JSON, returning as text');
//               return text;
//             }
//           }
//         };
//       },
//       transformResponse: (response: any) => {
//         console.log('=== TRANSFORM RESPONSE ===');
//         console.log('Response type:', typeof response);
//         console.log('Response value:', response);
//         console.log('========================');
        
//         // If response is a string (plain text)
//         if (typeof response === 'string') {
//           return { message: response };
//         }
        
//         // If response already has message property
//         if (response && typeof response === 'object' && response.message) {
//           return response;
//         }
        
//         // If response is an object without message
//         if (response && typeof response === 'object') {
//           return { 
//             message: JSON.stringify(response) 
//           };
//         }
        
//         // Fallback
//         return { 
//           message: 'Badge added successfully' 
//         };
//       },
//       transformErrorResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== TRANSFORM ERROR ===');
//         console.log('Response:', response);
//         console.log('Response type:', typeof response);
//         console.log('Meta:', meta);
//         console.log('Meta response:', meta?.response);
//         console.log('Status:', meta?.response?.status);
//         console.log('Arg:', arg);
//         console.log('======================');
        
//         return {
//           status: meta?.response?.status || 'UNKNOWN',
//           data: response,
//           message: typeof response === 'string' ? response : response?.message || 'Unknown error'
//         };
//       },
//       invalidatesTags: (result, error, { packageName }) => {
//         console.log('=== INVALIDATE TAGS ===');
//         console.log('Result:', result);
//         console.log('Error:', error);
//         console.log('Package Name:', packageName);
//         console.log('======================');
        
//         if (!error) {
//           return [
//             { type: 'Packages', id: 'LIST' },
//             { type: 'Badges', id: 'LIST' }
//           ];
//         }
//         return [];
//       },
//     }),
//   }),
// });

// export const { useAddBadgeToPackageMutation } = addBadgeApi;

import { baseApi } from "../../baseApi";

interface AddBadgeRequest {
  packageName: string;
  badgeName: string;
}

interface AddBadgeResponse {
  message: string;
}

// Define types for transform functions
// interface ErrorResponse {
//   status?: number;
//   data?: unknown;
//   message?: string;
// }

// interface ResponseMeta {
//   response?: {
//     status?: number;
//   };
// }

// interface TransformArgs {
//   packageName: string;
//   badgeName: string;
// }

export const addBadgeApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addBadgeToPackage: builder.mutation<AddBadgeResponse, AddBadgeRequest>({
      query: ({ packageName, badgeName }) => {
        const requestBody = {
          package_name: packageName,
          badge_name: badgeName
        };
        
        console.log('=== ADD BADGE API REQUEST ===');
        console.log('Package Name:', packageName);
        console.log('Badge Name:', badgeName);
        console.log('Request Body:', requestBody);
        console.log('============================');
        
        return {
          url: `badges/add-to-package`,
          method: 'PUT',
          body: requestBody,
          // Force JSON content type
          headers: {
            'Content-Type': 'application/json',
          },
          // Add response type handling
          responseHandler: async (response) => {
            console.log('=== RAW RESPONSE ===');
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Response ok:', response.ok);
            
            // Log all headers
            const headers: Record<string, string> = {};
            response.headers.forEach((value, key) => {
              headers[key] = value;
            });
            console.log('All headers:', headers);
            
            const contentType = response.headers.get('content-type');
            console.log('Content-Type:', contentType);
            console.log('===================');
            
            // If 401, log it clearly
            if (response.status === 401) {
              console.error('⚠️ AUTHENTICATION FAILED - 401 Unauthorized');
              console.error('Check if NextAuth session is valid and token is being sent');
              const text = await response.text();
              console.error('Response body:', text);
              throw new Error('Authentication failed - please log in again');
            }
            
            // Handle plain text response
            if (contentType && contentType.includes('text/plain')) {
              const text = await response.text();
              console.log('Plain text response:', text);
              return text;
            }
            
            // Handle JSON response
            if (contentType && contentType.includes('application/json')) {
              const json = await response.json();
              console.log('JSON response:', json);
              return json;
            }
            
            // Fallback: try to get text
            const text = await response.text();
            console.log('Fallback text response:', text);
            
            // Try to parse as JSON
            try {
              const json = JSON.parse(text);
              console.log('Parsed as JSON:', json);
              return json;
            } catch {
              console.log('Not JSON, returning as text');
              return text;
            }
          }
        };
      },
      transformResponse: (response: unknown) => {
        console.log('=== TRANSFORM RESPONSE ===');
        console.log('Response type:', typeof response);
        console.log('Response value:', response);
        console.log('========================');
        
        // If response is a string (plain text)
        if (typeof response === 'string') {
          return { message: response };
        }
        
        // If response already has message property
        if (response && typeof response === 'object' && 'message' in response && typeof (response as { message: unknown }).message === 'string') {
          return { message: (response as { message: string }).message };
        }
        
        // If response is an object without message
        if (response && typeof response === 'object') {
          return { 
            message: JSON.stringify(response) 
          };
        }
        
        // Fallback
        return { 
          message: 'Badge added successfully' 
        };
      },
      // transformErrorResponse: (response: ErrorResponse, meta: ResponseMeta, arg: TransformArgs) => {
      //   console.log('=== TRANSFORM ERROR ===');
      //   console.log('Response:', response);
      //   console.log('Response type:', typeof response);
      //   console.log('Meta:', meta);
      //   console.log('Meta response:', meta?.response);
      //   console.log('Status:', meta?.response?.status);
      //   console.log('Arg:', arg);
      //   console.log('======================');
        
      //   return {
      //     status: meta?.response?.status || 'UNKNOWN',
      //     data: response,
      //     message: typeof response === 'string' ? response : response?.message || 'Unknown error'
      //   };
      // },
      invalidatesTags: (result, error, { packageName }) => {
        console.log('=== INVALIDATE TAGS ===');
        console.log('Result:', result);
        console.log('Error:', error);
        console.log('Package Name:', packageName);
        console.log('======================');
        
        if (!error) {
          return [
            { type: 'Packages', id: 'LIST' },
            { type: 'Badges', id: 'LIST' }
          ];
        }
        return [];
      },
    }),
  }),
});

export const { useAddBadgeToPackageMutation } = addBadgeApi;