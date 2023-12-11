import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const CandidateRoleServices=()=>{
    const api = useApi(BASE_URL, true)
    return{
        GetCurrentCvUser: async(id)=>{
            const response = await api.get(`candidate/cv_apply/${id}`)
            return response
        }
    }
} 