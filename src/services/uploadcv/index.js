import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const ManageCv = () => {
  const api = useApi(BASE_URL, true);
  return {
    UploadCv: async (formData, userId) => {
      try {
        const response = await api.post(`/candidate/uploadCv?userId=${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
      } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
      }
    },

    GetCandidateCv: async (id) => {
      try {
        const response = await api.get(`/candidate/linkCv/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
      }
    },
  };
};
