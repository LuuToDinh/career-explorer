const initialData = {
  account: [],
  accountdetail: {},
  postaccount: {},
  deleteAccount: {},
};
export const accountReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ACCOUNT':
      return {
        ...state,
        account: payload,
      };
    case 'GET_ACCOUNT_DETAIL':
      return {
        ...state,
        accountdetail: payload,
      };
    case 'POST_ACCOUNT':
      return {
        ...state,
        postaccount: payload,
      };
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        deleteAccount: payload,
      };
    default:
      return state;
  }
};
