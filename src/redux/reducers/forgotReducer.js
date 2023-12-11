const initialData = {
  forgotPass: {},
  sendCode: {},
};
export const sendEmailReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'RESEND_PASS':
      return {
        ...state,
        forgotPass: payload,
      };
    case 'SEND_CODE':
      return {
        ...state,
        sendCode: payload,
      };
    default:
      return state;
  }
};
