import i18next from 'i18next';

const initialState = {
  isLoading: false,
  isGetInfoSuccess: false,
  isGetAvatarSuccess: false,
  isUpdateInfoSuccess: false,
  isUpdateAvatarSuccess: false,
  info: {},
  error: null,
  toastMessage: {
    isShow: false,
    status: '',
    message: '',
  },
};

export const candidateInfoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CANDIDATE_INFO_REQUEST':
      return {
        ...state,
        isGetInfoSuccess: false,
        isLoading: true,
        error: null,
      };
    case 'GET_CANDIDATE_AVATAR_REQUEST':
      return {
        ...state,
        isGetAvatarSuccess: false,
        isLoading: true,
        error: null,
      };
    case 'UPDATE_CANDIDATE_INFO_REQUEST':
      return {
        ...state,
        isLoading: true,
        isUpdateInfoSuccess: false,
        error: null,
      };
    case 'UPDATE_CANDIDATE_AVATAR_REQUEST':
      return {
        ...state,
        isLoading: true,
        isUpdateAvatarSuccess: false,
        error: null,
      };
    case 'GET_CANDIDATE_INFO_SUCCESS':
      localStorage.setItem(
        'candidateInfo',
        JSON.stringify({
          ...state.info,
          ...payload,
        })
      );
      return {
        ...state,
        isLoading: !state.isGetAvatarSuccess,
        isGetInfoSuccess: true,
        info: {
          ...state.info,
          ...payload,
        },
        error: null,
      };
    case 'GET_CANDIDATE_AVATAR_SUCCESS':
      localStorage.setItem(
        'candidateInfo',
        JSON.stringify({
          ...state.info,
          url: payload.urlImage,
        })
      );
      return {
        ...state,
        isLoading: !state.isGetInfoSuccess,
        isGetAvatarSuccess: true,
        info: {
          ...state.info,
          url: payload.urlImage,
        },
        error: null,
      };
    case 'UPDATE_CANDIDATE_INFO_SUCCESS':
      localStorage.setItem(
        'candidateInfo',
        JSON.stringify({
          ...state.info,
          ...payload,
        })
      );
      return {
        ...state,
        isLoading: !state.isUpdateAvatarSuccess,
        isUpdateInfoSuccess: true,
        info: {
          ...state.info,
          ...payload,
        },
        error: null,
        toastMessage: {
          isShow: true,
          status: 'success',
          message: i18next.t('messageProfile.updateInfoSuccess'),
        },
      };
    case 'UPDATE_CANDIDATE_AVATAR_SUCCESS':
      localStorage.setItem(
        'candidateInfo',
        JSON.stringify({
          ...state.info,
          url: payload.urlImage,
        })
      );
      return {
        ...state,
        isLoading: !state.isUpdateInfoSuccess,
        isUpdateAvatarSuccess: true,
        info: {
          ...state.info,
          url: payload.urlImage,
        },
        error: null,
        toastMessage: {
          isShow: true,
          status: 'success',
          message: i18next.t('messageProfile.updateAvatarSuccess'),
        },
      };
    case 'GET_CANDIDATE_INFO_ERROR':
      return {
        ...state,
        isLoading: false,
        isGetInfoSuccess: false,
        error: payload,
      };
    case 'GET_CANDIDATE_AVATAR_ERROR':
      return {
        ...state,
        isLoading: false,
        isGetAvatarSuccess: false,
        error: payload,
      };
    case 'UPDATE_CANDIDATE_INFO_ERROR':
      console.log({ payload });
      return {
        ...state,
        isLoading: false,
        isUpdateInfoSuccess: false,
        error: payload,
        toastMessage: {
          isShow: true,
          status: 'error',
          message: `${i18next.t('messageProfile.updateInfoError')}\n${payload?.response?.error}: ${
            payload?.response?.message
          }`,
        },
      };
    case 'UPDATE_CANDIDATE_AVATAR_ERROR':
      return {
        ...state,
        isLoading: false,
        isUpdateAvatarSuccess: false,
        error: payload,
        toastMessage: {
          isShow: true,
          status: 'error',
          message: `${i18next.t('messageProfile.updateAvatarError')}\n${payload?.response?.error}: ${
            payload?.response?.message
          }`,
        },
      };
    case 'UPDATE_CANDIDATE_INFO_ONLY':
      return {
        ...state,
        isUpdateAvatarSuccess: true,
      };
    case 'GET_CANDIDATE_INFO_FROM_LOCAL_STORAGE':
      return {
        ...state,
        info: payload,
      };
    case 'CLOSE_TOAST_MESSAGE':
      return {
        ...state,
        toastMessage: {
          ...state.toastMessage,
          isShow: false,
        },
      };
    default:
      return state;
  }
};
