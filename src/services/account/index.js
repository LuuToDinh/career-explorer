import { useApi } from '../api';

export const AccountService = () => {
  const api = useApi('http://fajob-env.eba-mfse6cxa.ap-southeast-1.elasticbeanstalk.com/api', true);
  return {
    GetAccount: async (page, limit) => {
      const response = await api.get(`/admin/view-account?page=${page}&limit=${limit}`);
      return response;
    },
    GetAccountDetail: async (id) => {
      const response = await api.get(`/admin/view-account/${id}`);
      return response;
    },
    PostAccount: async (data) => {
      try {
        const response = await api.post(`/admin/create`, data);
        return response;
      } catch (error) {
        return error;
      }
    },
    DeleteAccount: async (data) => {
      const response = await api.delete(`/admin/delete-account/id`, { data });
      return response;
    },
  };
};
