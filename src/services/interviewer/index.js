import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const InterviewerService = () => {
    const api = useApi(BASE_URL,true)
    return {
        GetInterviewerList:async (page,limit)=>{
            const response = await api.get(`/reccer/interviewers?page=${page}&limit=${limit}`)
            
            return response
        },
        
        GetInterviewer:async (id)=>{
                const response = await api.get(`/reccer/interviewers/${id}`)
                console.log('response',response)
                return response
        }
    }
};

