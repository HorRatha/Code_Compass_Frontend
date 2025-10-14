import { baseApi } from "../../baseApi";

interface ModifyPackageRequest {
  name?: string;
  description?: string;
}

interface ModifyPackageParams {
  id: number;
  data: ModifyPackageRequest;
}

interface PackageResponse {
  id: number;
  name: string;
  description: string;
  status: "PENDING" | "APPROVED";
  problems: Array<{
    id: number;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    tags: string[];
  }>;
  badgesResponse: { name: string } | null;
  author: string;
}

export const modifyPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyPackage: builder.mutation<PackageResponse, ModifyPackageParams>({
      query: ({ id, data }) => ({
        url: `packages/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Packages' },
        { type: 'Packages', id }
      ],
    }),
  }),
});

export const { useModifyPackageMutation } = modifyPackageApi;