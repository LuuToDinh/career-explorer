import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const InterviewService = () => {
  const api = useApi(BASE_URL, true);
  return {
    GetInterviewByCadidateJob: async (candidateId, jobId) => {
      const data = await api.get(`/reccer/interview/${candidateId}/${jobId}`);
      return data.data;
    },
    PostInterview: async (data) => {
      const response = await api.post('/reccer/interview/create', data);
      return response;
    },

    PutInterview: async (data) => {
      const response = await api.put(`/reccer/interview/update/id`, data);
      return response;
    },
  };
};
