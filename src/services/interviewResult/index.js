import { useApi } from '../api';

export const InterviewResultService = () => {
  const api = useApi('http://fajob-env.eba-mfse6cxa.ap-southeast-1.elasticbeanstalk.com/api', true);
  return {
    SubmitInterviewResult: async (data) => {
      const response = await api.put('/interviewer/update', data);
      return response.data;
    },
    GetInterviewResult: async (id) => {
      const response = await api.get(`/interviewer/interview/${id}`);
      return response.data;
    },
  };
};
