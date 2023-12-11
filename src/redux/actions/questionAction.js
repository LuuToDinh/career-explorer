/*eslint-disable*/
import { any } from "prop-types"
import { QuestionService } from "../../services/question"
export const GetQuestionAction=(page,limit) => {
   return async (dispatch)=>{
        try {
            const response = await QuestionService().GetQuestionList(page,limit)
            dispatch({type:"GET_QUESTION",payload:response.data.listQuestion})
        } catch (error) {
            console.log("Error this code",error );            
        }
   } 
}
export const CreateQuestionAction=(data) => {
    return async (dispatch)=>{
         try {
             const response = await QuestionService().CreateQuestion(data)
             dispatch({type:"CREATE_QUESTION",payload:response.data})
             return response
         } catch (error) {
             console.log("Error this code",error );            
         }
    } 
 }
 export const UpdateQuestionAction=(data) => {
    return async (dispatch)=>{
         try {
             const response = await QuestionService().UpdateQuestion(data)
             dispatch({type:"UPDATE_QUESTION",payload:response.data})
             return response
         } catch (error) {
             console.log("Error this code",error );            
         }
    } 
 }
export const DeleteQuestionAction=(id)=>{
    return async(dispatch)=>{
        try{
            const response=await QuestionService().DeleteQuetion(id)
            dispatch({type:"DELETE_QUESTION",payload:response})

        } catch (error) {
            console.log("Error this code",error );            
        }
    }
}
