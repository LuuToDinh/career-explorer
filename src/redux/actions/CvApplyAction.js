/* eslint-disable*/
import { CvApplyService } from '../../services/cv_apply';

export const GetCvApplyLitstAction = (page, limit) => async (dispatch) => {
  try {
    const data = await CvApplyService().GetCvApplyList(page, limit);
    dispatch({ type: 'GET_CV_APPLY_LIST', payload: data.list });
  } catch (error) {
    console.log('Error this code', error);
  }
};
export const GetCvApplyAction = (id) => async (dispatch) => {
  try {
    const data = await CvApplyService().GetCvApply(id);
    dispatch({ type: 'GET_CV_APPLY', payload: data });
    return data;
  } catch (error) {
    console.log('Error this code', error);
  }
};
export const DeleteCvApplyAction = (id) => async (dispatch) => {
  try {
    const data = await CvApplyService().DeleteCvApply(id);
    dispatch({ type: 'DELETE_CV_APPLY', payload: data.data });
  } catch (error) {
    console.log('Error this code', error);
  }
};

export const GetCvApplyByCandidateJobAction = (candidateId, jobId) => async (dispatch) => {
  try {
    const data = await CvApplyService().GetCvApplyByCandidateJob(candidateId, jobId);
    dispatch({ type: 'GET_CV_APPLY_BY_CANDIDATE_JOB', payload: data });
  } catch (error) {
    console.log('Error this code', error);
  }
};
export const AcceptCvApplyAction = (id) => async (dispatch) => {
  try {
    const response = await CvApplyService().AcceptCvApply(id);
    dispatch({ type: 'ACCEPT_CV_APPLY', payload: response });

    return response;
  } catch (error) {
    console.log('Error this code', error);
    return Promise.reject(error);
  }
};
export const RejectCvApplyAction = (id) => async (dispatch) => {
  try {
    const response = await CvApplyService().RejectCvApply(id);
    dispatch({ type: 'REJECT_CV_APPLY', payload: response });
    return response;
  } catch (error) {
    console.log('Error this code', error);
    return Promise.reject(error);
  }
};
