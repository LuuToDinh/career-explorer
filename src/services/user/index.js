import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const UserServices = () => {
  const api = useApi(BASE_URL, true);
  return {
    login: async (username, password) => {
      const response = await api.post('v1/auth/authenticate', {
        username,
        password,
      });
      return response;
    },
    logout: async () => {
      api.defaults.headers.head.Authorization = null;
    },
    register: async (data) => {
      try {
        const response = await api.post('v1/auth/register', data);
        return response;
      } catch (error) {
        return error;
      }
    },
    refreshToken: async (refreshToken) => {
      const headers = {
        Authorization: `Bearer ${refreshToken}`,
      };

      const response = await api.post('v1/auth/refresh-token', {}, { headers });
      return response;
    },
    GetUserId: async (id) => {
      const response = await api.get(`user/${id}`);
      // console.log(response.data);
      return response.data;
    },
    UpdateUserId: async (data) => {
      try {
        const response = await api.put(`user/update`, data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    GetUserAvatarId: async (id) => {
      const response = await api.get(`image/images/user/${id}`);
      // console.log(response.data);
      return response.data;
    },
    UpdateUserAvatarId: async (data) => {
      const response = await api.post(`image/user/upload`, data);
      // console.log(response)
      return response.data;
    },
    UploadFileAvatar: async (formData, userId) => {
      try {
        const response = await api.post(`/image/user/upload?userId=${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data; // Assuming the API returns some data upon successful upload
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error uploading files:', error);
        throw error;
      }
    },
    ChangePassword: async (data) => {
      try {
        const response = await api.put('user/password/change', data);
        return response;
      } catch (error) {
        return error;
      }
    },
  };
};
