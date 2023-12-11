import { useApi } from '../api';

export const DeleteService = () => {
  const api = useApi('http://fajob-env.eba-mfse6cxa.ap-southeast-1.elasticbeanstalk.com/api', true);
  return {
    DeleteReccer: async (id) => {
      const response = await api.delete(`/reccer/job/delete/${id}`);
      return response;
    },
  };
};
