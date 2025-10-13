// import { baseApi } from "../baseApi";

// export interface BadgeResponse {
//   name: string;
//   icon_url: string;
//   description: string;
// }

// export interface Subscriber {
//   username: string;
//   rank: number;
//   stars: number;
//   total_problem_solved: number;
//   level: string | null;
//   profile_image: string | null;
//   location: string | null;
//   badgesResponse: BadgeResponse[];
// }

// export interface LeaderboardResponse {
//   top_subscribers: Subscriber[];
//   your_rank: number;
//   nearby_subscribers: Subscriber[];
//   current_subscribers: Subscriber;
// }

// export const leaderboardApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getLeaderboard: builder.query<LeaderboardResponse, void>({
//       query: () => ({
//         url: `leaderboard/me`,
//         method: 'GET',
//       }),
//       providesTags: ['Leaderboard'],
//     }),
//   }),
// });

// export const { useGetLeaderboardQuery } = leaderboardApi;

import { baseApi } from "../baseApi";

export interface BadgeResponse {
  name: string;
  icon_url: string;
  description: string;
}

export interface UserLanguageResponse {
  language_id: string;
  total_problem_solved_by_language: number;
}

export interface UserProfileResponse {
  username: string;
  email: string;
  gender: string;
  dob: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  image_url: string;
  level: string;
  coin: number;
  star: number;
  rank: number;
  totalProblemsSolved: number;
  is_deleted: boolean;
  badge: number;
  submissionHistories: number;
  solution: number;
  view: number;
  comment: number;
  role: string;
  user_language_responses: UserLanguageResponse[];
}

export interface LeaderboardResponse {
  userProfileResponses: UserProfileResponse[];
}

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<LeaderboardResponse, void>({
      query: () => ({
        url: `leaderboard`,
        method: 'GET',
        // REMOVE the headers: {} line to let baseApi handle headers automatically
      }),
      providesTags: ['Leaderboard'],
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;