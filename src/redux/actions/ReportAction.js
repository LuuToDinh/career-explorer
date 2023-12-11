/*eslint-disable*/

import { ReportService } from '../../services/report';

export const GetTotalInterviewAction = () => {
  return async (dispatch) => {
    try {
      const data = await ReportService().GetTotalInterview();
      dispatch({ type: 'GET_TOTAL_INTERVIEW', payload: data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};


export const GetTotalInterviewTodayAction = () => {
  return async (dispatch) => {
    try {
      const data = await ReportService().GetTotalInterviewToday();
      dispatch({ type: 'GET_TOTAL_INTERVIEW_TODAY', payload: data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetTotalCVApplyAction = () => {
  return async (dispatch) => {
    try {
      const data = await ReportService().GetTotalCVApply();
      dispatch({ type: 'GET_TOTAL_CV_APPLY', payload: data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetRatioCVApplyAction = () => {
  return async (dispatch) => {
    try {
      const data = await ReportService().GetRatioCVApply();
      dispatch({ type: 'GET_RATIO_CV_APPLY', payload: data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetAccessDayAction = () => {
  return async (dispatch) => {
    try {
      const data = await ReportService().GetAccessDay();
      dispatch({ type: 'GET_ACCESS_DAY', payload: data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
