import { baseApi } from "../../baseApi";

// Response type for media upload
export interface UploadMediaResponse {
  name: string;
  extension: string;
  mimeTypeFile: string;
  uri: string;
  size: number;
}

export const uploadMediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation<UploadMediaResponse, File>({
      query: (file) => {
        const formData = new FormData();
        
        // Try the most common field names - adjust based on your API documentation
        // Check your backend to see which parameter name it expects
        formData.append('file', file); // Most common
        
        // If 'file' doesn't work, try one of these:
        // formData.append('image', file);
        // formData.append('media', file);
        // formData.append('multipartFile', file); // Common in Spring Boot
        
        // Log what we're sending
        console.log('=== Upload Media Debug ===');
        console.log('File name:', file.name);
        console.log('File type:', file.type);
        console.log('File size:', file.size);
        console.log('FormData entries:');
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log('========================');
        
        return {
          url: 'medias/upload',
          method: 'POST',
          body: formData,
          // Let the browser set Content-Type with boundary automatically
        };
      },
      invalidatesTags: ['Medias'],
    }),
  }),
});

export const { useUploadMediaMutation } = uploadMediaApi;