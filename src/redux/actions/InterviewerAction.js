import { InterviewerService } from "../../services/interviewer"

export const GetInterviewerListAction=(page,limit)=>{
    return async (dispatch)=>{

        try {
            const data= await InterviewerService().GetInterviewerList(page,limit);
            dispatch({type:'GET_INTERVIEWER_LIST',payload:data.data.listInterviewer})
        }
        catch (error){
            console.log("Error this code",error)
        }
    }
}
export const GetInterviewerAction=(id)=>{
    return async (dispatch)=>{

        try {
            const data= await InterviewerService().GetInterviewer(id)
            dispatch({type:'GET_INTERVIEWER',payload:data.data })
        }
        catch (error){
            console.log("Error this code",error)
        }
    }
}

