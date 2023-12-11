const initialData = {
    blists: [],
    newblist:null,
    blist: null,
    deleteBlist:{},
    
  };
  export const blacklistReducer = (state = initialData, action = {}) => {
    const { type, payload } = action;
    switch (type) {
      case 'GET_BLACKLIST':
        return {
          ...state,
          blists: payload,
        };
      case 'GET_BLACKLIST_ID': {
        return {
          ...state,
          blist: payload,
        };
      }
      case 'UPDATE_BLACKLIST':
        return {
          ...state,
          blist: {
            ...state.blist,
            ...payload,
          },
        };
        case 'CREATE_BLACKLIST': {
          return {
            ...state,
            newblist: payload,
          };
        }
        case 'DELETE_BLACKLIST': {
          return {
            ...state,
            deleteBlist: payload,
          };
        }
      default:
        return state;
    }
  };
  