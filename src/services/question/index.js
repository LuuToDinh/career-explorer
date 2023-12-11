import { useApi } from '../api';

export const QuestionService = () => {
  const api = useApi('http://fajob-env.eba-mfse6cxa.ap-southeast-1.elasticbeanstalk.com/api', true);
  return {
    GetQuestionList: async (page = 1, limit = 100) => {
      const response = await api.get(`/interviewer/question/view?page=${page}&limit=${limit}`);
      return response;
    },
    CreateQuestion: async (data) => {
      const response = await api.post(`interviewer/question/create`, data);
      return response;
    },
    UpdateQuestion: async (data) => {
      const response = await api.put(`interviewer/question/update/id`, data);
      return response;
    },
    DeleteQuetion: async (id) => {
      const response = await api.delete(`interviewer/question/delete/${id}`);
      return response;
    },
    SearchQuestion: async (description = '', page = 1, limit = 10) => {
      const response = await api.get(
        `/interviewer/question/search-description?description=${description}&page=${page}&limit=${limit}`
      );
      return response;
    },
  };
};
