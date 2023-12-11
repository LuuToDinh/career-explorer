/*eslint-disable*/
import { ManageCv } from '../../services/uploadcv';

export const UploadCVForCandidate = (formData, userId) => {
  return async (dispatch) => {
    try {
      const data = await ManageCv().UploadCv(formData, userId);
      dispatch({ type: 'UPLOAD_CV', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const GetCandidateCv = (id) => {
  return async (dispatch) => {
    try {
      const data = await ManageCv().GetCandidateCv(id);
      dispatch({ type: 'GET_CANDIDATE_CV', payload: data });
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };
};
