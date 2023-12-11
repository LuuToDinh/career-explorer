const initData = {
  info: null,
};
export const candidateRolesReduccer = (state = initData, action = {}) => {
   const {type,payload}=action
   switch(type){
      case 'GET_CURRENT_APPLYCV':
          return{
            ...state,
            info:payload
          }
        case 'CLEAR':
          return {
            ...initData
          }
      default:
         return state 
   }

};
