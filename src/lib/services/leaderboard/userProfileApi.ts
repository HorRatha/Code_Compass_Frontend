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
  imageUrl: string | null;
  level: string;
  coin: number;
  star: number;
  rank: number;
  totalProblemsSolved: number;
  isDeleted: boolean;
  badge: number;
  submissionHistories: number;
  solution: number;
  view: number;
  comment: number;
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
  }),
});

export const { useGetUserProfileQuery } = userProfileApi;