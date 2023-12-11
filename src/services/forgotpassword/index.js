import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const ReSendPassWord = () => {
  const api = useApi(BASE_URL, true);
  return {
    ForgetPass: async (data) => {
      try {
        const response = await api.put('/public/password/forget/send', data);
        return response;
      } catch (error) {
        return error;
      }
    },

    SendCode: async (data) => {
      try {
        const response = await api.put('/public/password/acceptOtp', data);
        return response;
      } catch (error) {
        return error;
      }
    },
  };
};
