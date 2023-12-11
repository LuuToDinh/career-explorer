/*eslint-disable*/

import { ReSendPassWord } from '../../services/forgotpassword';

export const ForgotPassWordAction = (data) => {
  return async (dispatch) => {
    const forgotPassword = await ReSendPassWord().ForgetPass(data);
    dispatch({ type: 'RESEND_PASS', payload: forgotPassword });
    return forgotPassword;
  };
};

export const SendCodeAction = (data) => {
  return async (dispatch) => {
    const sendCode = await ReSendPassWord().SendCode(data);
    dispatch({ type: 'SEND_CODE', payload: sendCode });
    return sendCode;
  };
};
