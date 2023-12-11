import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const ReportService = () => {
  const api = useApi(BASE_URL, true)
  return {
    GetTotalInterview: async () => {
      const response = await api.get(`/report/total-interview`)
      return response.data
    },
    GetTotalInterviewToday: async () => {
      const response = await api.get(`/report/total-interview-today`)
      return response.data
    },
    GetTotalCVApply: async () => {
      const response = await api.get(`/report/total-cv-apply`)
      return response.data
    },
    GetRatioCVApply: async () => {
      const response = await api.get(`/report/ratio-cv-apply`)
      return response.data
    },
    GetAccessDay: async () => {
      const response = await api.get(`/report/access-day`)
      return response.data
    }
  }
};
