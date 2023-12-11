const initialData = {
  candidateCv: {},
};
export const eventReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPLOAD_CV':
      return {
        ...state,
        uploadedData: payload,
      };
    case 'GET_CANDIDATE_CV': {
      return {
        ...state,
        candidateCv: payload,
      };
    }
    default:
      return state;
  }
};
