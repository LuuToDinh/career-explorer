/*eslint-disable*/
import { InterviewService } from '../../services/interview';

export const GetInterviewListAction = (page, limit) => {
  return async (dispatch) => {
    try {
      const data = await InterviewService().GetInterviewList(page, limit);
      dispatch({
        type: 'GET_INTERVIEW_LIST',
        payload: data, // todo
      });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetInterviewAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await InterviewService().GetInterview(id);
      dispatch({
        type: 'GET_INTERVIEW',
        payload: data, // todo
      });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetInterviewByCadidateJobAction = (candidateId, jobId) => {
  return async (dispatch) => {
    try {
      const data = await InterviewService().GetInterviewByCadidateJob(candidateId, jobId);
      dispatch({ type: 'GET_INTERVIEW_BY_CANDIDATE_JOB', payload: data });
      return data;
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};

export const PostInterviewAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await InterviewService().PostInterview(data);
      dispatch({ type: 'POST_INTERVIEW', payload: response });
    } catch (error) {
      console.log('Error this code', error);
      return Promise.reject(error);
    }
  };
};

export const PutInterviewAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await InterviewService().PutInterview(data);
      dispatch({ type: 'PUT_INTERVIEW', payload: response });
      return response;
    } catch (error) {
      console.log('Error this code', error);
      return Promise.reject(error);
    }
  };
};
