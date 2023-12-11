import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const CandidateInfoService = () => {
  const api = useApi(BASE_URL, true);
  return {
    GetCandidateInfo: async (id) => {
      const response = await api.get(`/candidate/view/${id}`);
      return response.data;
    },
    UpdateCandidateInfo: async (data) => {
      const response = await api.put('/candidate/update-info', data);
      return response.data;
    },
  };
};
