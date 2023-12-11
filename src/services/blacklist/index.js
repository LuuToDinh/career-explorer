import { useApi } from '../api';

export const BlacklistService = () => {
  const api = useApi('http://fajob-env.eba-mfse6cxa.ap-southeast-1.elasticbeanstalk.com/api', true);
  return {
    GetBlacklist: async (page, limit) => {
      const response = await api.get(`reccer/blacklist/view?page=${page}&limit=${limit}`);
      return response.data;
    },
    GetBlacklistId: async (id) => {
      const response = await api.get(`reccer/blacklist/${id}`);
      console.log(response.data);
      return response.data;
    },
    UpdateBlacklistId: async (data) => {
      const response = await api.put(`reccer/blacklist/update/id`, data);
      console.log(response);
      return response.data;
    },
    CreateBlacklist: async (data) => {
      const response = await api.post(`reccer/blacklist/create`, data);
      console.log(response);
      return response.data;
    },
    DeleteBlacklist: async (id) => {
      const response = await api.delete(`/reccer/blacklist/delete/${id}`);
      return response.data;
    },
  };
};
