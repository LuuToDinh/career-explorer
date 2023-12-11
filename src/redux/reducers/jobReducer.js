const initialData = {
  jobs: [],
  newjob: null,
  job: null,
  deleteJob: {},
};
export const jobReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_JOB':
      return {
        ...state,
        jobs: payload,
      };
    case 'GET_JOB_ID': {
      return {
        ...state,
        job: payload,
      };
    }
    case 'UPDATE_JOB':
      return {
        ...state,
        job: {
          ...state.job,
          ...payload,
        },
      };
    case 'CREATE_JOB': {
      return {
        ...state,
        newjob: payload,
      };
    }
    case 'DELETE_JOB': {
      return {
        ...state,
        deleteJob: payload,
      };
    }
    default:
      return state;
  }
};
