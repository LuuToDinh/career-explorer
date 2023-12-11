import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const CvApplyService = () => {
    const api = useApi(BASE_URL,true)
    return {
        GetCvApplyList:async (page,limit)=>{
            const response = await api.get(`interviewer/cv-apply?page=${page}&limit=${limit}`)
            return response.data
        },
        GetCvApply :async(id)=>{
            const response =await api.get(`/interviewer/cv-apply/${id}`)
            return response.data
        },
        GetCvApplyByCandidateJob :async (candidateId,jobId)=>{
            const response=await api.get(`/reccer/cv-apply/${jobId}/${candidateId}`)
            return response.data
        }
        ,
        AcceptCvApply: async(id)=>{
            const response=await api.put('reccer/cv-apply-accept', {id})
            return response
        },
        RejectCvApply: async(id)=>{
            const response=await api.put('reccer/cv-apply-reject',{id})
            return response;
        },
        DeleteCvApply: async (id) => {
          const response = await api.delete(`/reccer/cv-apply/delete/${id}`);
          return response;
        }
        
        
    }
};
