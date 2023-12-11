const initialData = {
  deleteData: {},
};
export const deleteReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'DELETE_ALL':
      return {
        ...state,
        deleteData: payload,
      };
    default:
      return state;
  }
};
