const initialData = {
  event: [],
  eventDetail: {},
  addEvent: {},
  deleteEvent: {},
};
export const eventReducer = (state = initialData, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_EVENT':
      return {
        ...state,
        event: payload,
      };
    case 'GET_EVENT_DETAIL': {
      return {
        ...state,
        eventDetail: payload,
      };
    }
    case 'ADD_EVENT': {
      return {
        ...state,
        addEvent: payload,
      };
    }
    case 'UPDATE_EVENT': {
      return {
        ...state,
        eventDetail: {
          ...state.eventDetail,
          ...payload,
        },
      };
    }
    case 'DELETE_EVENT': {
      return {
        ...state,
        deleteEvent: payload,
      };
    }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        uploadedData: payload,
      };
    default:
      return state;
  }
};
