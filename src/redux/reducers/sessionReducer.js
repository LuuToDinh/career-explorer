const initState = {
  access_token: null,
  refresh_token: null,
  register: null,
  user: {},
  userAvatar: {},
  changePassword: {},
};
export const sessionReducer = (state = initState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
    case 'CANDIDATE_LOGIN':
      return {
        ...state,
        access_token: payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        access_token: null,
      };
    case 'REGISTER':
      return {
        ...state,
        register: payload,
      };
    case 'REFRESHTOKEN':
      return {
        ...state,
        refresh_token: null,
      };
    case 'GET_USERID': {
      return {
        ...state,
        user: payload,
      };
    }
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case 'GET_USER_AVATARID': {
      return {
        ...state,
        userAvatar: payload,
      };
    }
    case 'UPDATE_USER_AVATARID':
      return {
        ...state,
        user: {
          ...state.userAvatar,
          ...payload,
        },
      };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        uploadedData: payload,
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        changePassword: payload,
      };
    default:
      return state;
  }
};
