// lib/services/media/mediaApi.ts
import { baseApi } from "../baseApi";

export interface UploadMediaResponse {
  name: string;
  extension: string;
  mimeTypeFile: string;
  uri: string;
  size: number;
}

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadMediaFile: builder.mutation<UploadMediaResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log("Upload request details:", {
          url: "/medias/upload",
          method: "POST",
          file: { name: file.name, size: file.size, type: file.type },
          formDataEntries: Array.from(formData.entries()),
        });
        return {
          url: "/medias/upload",
          method: "POST",
          body: formData,
        };
      },
      transformErrorResponse: (response) => {
        console.error("Backend error response:", {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      invalidatesTags: ["Medias"],
    }),
  }),
});

export const { useUploadMediaFileMutation } = mediaApi;