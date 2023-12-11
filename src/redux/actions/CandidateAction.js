import { CandidateService } from "../../services/candidate";

export const GetCandidateListAction=(page,limit)=>{
    return async (dispatch)=>{

        try {
            const data= await CandidateService().GetCandidateList(page,limit)
            dispatch({type:'GET_CANDIDATE_LIST',payload:data.listGeneralCandidateInfoResponse})
        }
        catch (error){
            console.log("Error this code",error)
        }
    }
}
export const GetCandidateAction=(id)=>{
    return async (dispatch)=>{
        try {
            const data=await CandidateService().GetCandidate(id)
            dispatch({type:'GET_CANDIDATE',payload:data})
        }
        catch (error){
            console.log("Error this code",error)
        }
    }
}