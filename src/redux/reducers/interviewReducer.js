const initialData={
    interviewList:[],
    interview:null,
    newInterview:{},
    editedInterview:{}
}
export const interviewReducer=(state=initialData,action={})=>{
    const {type,payload}=action;
    switch (type) {
        case "GET_INTERVIEW_LIST":
            return {
                ...state,
                interviewList:payload
            }
        case 'GET_INTERVIEW':
            return {
                ...state,
                interview:payload
            }
        case "GET_INTERVIEW_BY_CANDIDATE_JOB":
            return {
                ...state,
                interview:payload
            }
        case "POST_INTERVIEW":
            return  {
                ...state,
                newInterview:payload
            }
        case 'PUT_INTERVIEW':
            return {
                ...state,
                editedInterview:payload
            }
        
        default:
            return state
    }
    
}