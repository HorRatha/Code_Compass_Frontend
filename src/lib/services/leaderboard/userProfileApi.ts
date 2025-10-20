// import { baseApi } from "../baseApi";

// export interface UserProfile {
//   username: string;
//   email: string;
//   gender: string;
//   dob: string | null;
//   location: string | null;
//   website: string | null;
//   github: string | null;
//   linkedin: string | null;
//   imageUrl: string | null;
//   level: string;
//   coin: number;
//   star: number;
//   rank: number;
//   totalProblemsSolved: number;
//   isDeleted: boolean;
//   badge: number;
//   submissionHistories: number;
//   solution: number;
//   view: number;
//   comment: number;
// }

// export const userProfileApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserProfile: builder.query<UserProfile, void>({
//       query: () => ({
//         url: `users/me`,
//         method: 'GET',
//       }),
//       providesTags: ['Users'],
//     }),
//   }),
// });

// export const { useGetUserProfileQuery } = userProfileApi;


import { baseApi } from "../baseApi";

export interface UserProfile {
  username: string;
  email: string;
  gender: string;
  dob: string | null;
  location: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  image_url: string | null;
  level: string;
  coin: number;
  star: number;
  rank: number;
  total_problem_solved: number;
  is_deleted: boolean;
  badge: number;
  submission_histories: number;
  solution: number;
  view: number;
  comment: number;
}

export interface UpdateUserProfileRequest {
  gender?: string;
  dob?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  image_url?: string;
}

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `users/me`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    updateUserProfile: builder.mutation<UserProfile, { username: string; body: UpdateUserProfileRequest }>({
      query: ({ username, body }) => ({
        url: `users/update/${username}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { 
  useGetUserProfileQuery,
  useUpdateUserProfileMutation
 } = userProfileApi;