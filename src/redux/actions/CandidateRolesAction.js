import { CandidateRoleServices } from '../../services/candidateRoles';

export const CandidateGetCvAction = (id) => {
  return async (dispatch) => {
    const response = await CandidateRoleServices().GetCurrentCvUser(id);

    try {

      if (response) {
        dispatch({ type: 'GET_CURRENT_APPLYCV', payload: response.data });
      } else {
        console.log(response)
        dispatch({ type: 'GET_CURRENT_APPLYCV', payload: null });
      }
    } catch (error) {
      // console.log("er",response)
    }
  };
};
export const ClearCandidateAction = () => async (dispatch) => {
  dispatch({ type: 'CLEAR' });
};
