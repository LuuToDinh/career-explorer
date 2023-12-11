const initialData ={
    candidateList:[],
    candidate:null,
};
export const candidateReducer = (state=initialData, action={})=>{
    const {type,payload}=action
    switch (type) {
        case 'GET_CANDIDATE_LIST':
            return {
                ...state,
                candidateList:payload
            }
       
        case "GET_CANDIDATE":
            return {
                ...state,
                candidate:payload
            }
        default:
            return state
        
    }
}
