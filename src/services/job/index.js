import { BASE_URL } from '../../constant/ActionType';
import { useApi } from '../api';

export const JobService = () => {
  const api = useApi(BASE_URL, true);
  return {
    GetJob: async (page = 1, limit = 100) => {
      const response = await api.get(`job?page=${page}&limit=${limit}`);
      return response.data;
    },
    GetJobId: async (id) => {
      const response = await api.get(`job/${id}`);
      return response.data;
    },
    UpdateJobId: async (data) => {
      const response = await api.put(`reccer/job/update/id`, data);
      return response.data;
    },
    CreateJob: async (data) => {
      const response = await api.post(`reccer/job/create`, data);
      console.log(response);
      return response.data;
    },
    DeleteJob: async (id) => {
      const response = await api.delete(`/reccer/job/delete/${id}`);
      return response;
    },
    ApplyJob: async (data) => {
      const response = await api.post('/candidate/cv_apply/create', data);
      return response.data;
    },
  };
};
