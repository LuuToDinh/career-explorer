/*eslint-disable*/

import { JobService } from '../../services/job';

export const GetJobAction = (page, limit) => {
  return async (dispatch) => {
    try {
      const data = await JobService().GetJob(page, limit);
      dispatch({ type: 'GET_JOB', payload: data.listGeneralJobInfoResponse });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetJobIdAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await JobService().GetJobId(id);
      dispatch({ type: 'GET_JOB_ID', payload: data });
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const UpdateJobIdAction = (data) => {
  return async (dispatch) => {
    try {
      const updatedJob = await JobService().UpdateJobId(data);
      dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
      return updatedJob;
    } catch (error) {
      console.log(error);
    }
  };
};
export const CreateJobAction = (data) => {
  return async (dispatch) => {
    try {
      const createJob = await JobService().CreateJob(data);
      dispatch({ type: 'CREATE_JOB', payload: createJob });
      return createJob;
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeleteJobAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await JobService().DeleteJob(id);
      dispatch({ type: 'DELETE_JOB', payload: data.data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
