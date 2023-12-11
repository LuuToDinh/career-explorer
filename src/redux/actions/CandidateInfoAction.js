import { CandidateInfoService } from '../../services/candidateInfo';
import { UserServices } from '../../services/user/index';

export const GetCandidateInfoAction = (id) => async (dispatch) => {
  dispatch({ type: 'GET_CANDIDATE_INFO_REQUEST' });
  try {
    const payload = await CandidateInfoService().GetCandidateInfo(id);
    dispatch({ type: 'GET_CANDIDATE_INFO_SUCCESS', payload });
  } catch (error) {
    dispatch({ type: 'GET_CANDIDATE_INFO_ERROR', payload: error });
  }
};

export const GetCandidateAvatarAction = (id) => async (dispatch) => {
  dispatch({ type: 'GET_CANDIDATE_AVATAR_REQUEST' });
  try {
    const payload = await UserServices().GetUserAvatarId(id);
    dispatch({ type: 'GET_CANDIDATE_AVATAR_SUCCESS', payload });
  } catch (error) {
    dispatch({ type: 'GET_CANDIDATE_AVATAR_ERROR', payload: error });
  }
};

export const UpdateCandidateInfoAction = (data) => async (dispatch) => {
  dispatch({ type: 'UPDATE_CANDIDATE_INFO_REQUEST' });
  try {
    const payload = await CandidateInfoService().UpdateCandidateInfo(data);
    dispatch({ type: 'UPDATE_CANDIDATE_INFO_SUCCESS', payload });
  } catch (error) {
    dispatch({ type: 'UPDATE_CANDIDATE_INFO_ERROR', payload: error });
  }
};

export const UpdateCandidateAvatarAction = (formData, id) => async (dispatch) => {
  dispatch({ type: 'UPDATE_CANDIDATE_AVATAR_REQUEST' });
  try {
    const payload = await UserServices().UploadFileAvatar(formData, id);
    dispatch({ type: 'UPDATE_CANDIDATE_AVATAR_SUCCESS', payload });
  } catch (error) {
    dispatch({ type: 'UPDATE_CANDIDATE_AVATAR_ERROR', payload: error });
  }
};
