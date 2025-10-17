import { baseApi } from "../baseApi";

export interface Multipart {
  name: string;
  extension: string;
  mimeTypeFile: string;
  uri: string;
  size: number;
}

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation<{ multipart: Multipart }, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "medias/upload",
          method: "POST",
          body: formData,
          // Remove any explicit Content-Type
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadMutation } = uploadApi;