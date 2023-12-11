import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const CandidateService = () => {
    const api = useApi(BASE_URL,true)
    return {
        GetCandidateList:async (page,limit)=>{
            const response = await api.get(`/reccer/candidate?page=${page}&limit=${limit}`)
            return response.data
        },
        GetCandidate :async(id)=>{
            const response =await api.get(`/interviewer/candidate/${id}`)
            return response.data
        }
    }
};
