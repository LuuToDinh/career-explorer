const initialData ={
    interviewerList:[],
    interviewer:null,
};
export const interviewerReducer = (state=initialData, action={})=>{
    const {type,payload}=action
    switch (type) {
        case 'GET_INTERVIEWER_LIST':
            
            return {
                ...state,
                interviewerList:payload
            }
       
        case "GET_INTERVIEWER":
            return {
                ...state,
                interviewer:payload
            }
        default:
            return state
        
    }
}