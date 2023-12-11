const initialData = {
  questions: [],
  question: null,
  addQuestion: {},
  updateQuestion: {},
  deleteQuestion: {},
};
export const questionReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  // console.log('payload', payload);
  switch (type) {
    case 'GET_QUESTION':
      return {
        ...state,
        questions: payload,
      };
    case 'CREATE_QUESTION':
      return {
        ...state,
        addQuestion: payload,
      };
    case 'UPDATE_QUESTION':
      return {
        ...state,
        updateQuestion: payload,
      };
    case 'DELETE_QUESTION':
      return {
        ...state,
        deleteQuestion: payload,
      };
    default:
      return state;
  }
};
