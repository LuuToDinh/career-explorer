const initialData = {
  cvApplyList: [],
  cvApply: null,
  deleteCvApply: {},
};
export const cvApplyReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CV_APPLY_LIST':
      return {
        ...state,
        cvApplyList: payload,
      };

    case 'GET_CV_APPLY':
      return {
        ...state,
        cvApply: payload,
      };
    case 'GET_CV_APPLY_BY_CANDIDATE_JOB':
      return {
        ...state,
        cvApply: payload,
      };
    case 'ACCEPT_CV_APPLY':
      return {
        ...state,
        cvApply: payload,
      };
    case 'REJECT_CV_APPLY':
      return {
        ...state,
        cvApply: payload,
      };

    case 'DELETE_CV_APPLY':
      return {
        ...state,
        deleteCvApply: payload,
      };
    default:
      return state;
  }
};
