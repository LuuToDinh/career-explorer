import { AccountService } from '../../services/account';

export const GetAccountAction = (page, limit) => async (dispatch) => {
  try {
    const data = await AccountService().GetAccount(page, limit);
    dispatch({ type: 'GET_ACCOUNT', payload: data.data.listCRUDAccountUserResponse });
  } catch (error) {
    console.log('Error this code', error);
  }
};
export const GetAccountDetailAction = (id) => async (dispatch) => {
  try {
    const data = await AccountService().GetAccountDetail(id);
    dispatch({ type: 'GET_ACCOUNT_DETAIL', payload: data.data });
  } catch (error) {
    console.log('Error this code', error);
  }
};
export const PostAccountAction = (data) => async (dispatch) => {
    const response = await AccountService().PostAccount(data);
    dispatch({ type: 'POST_ACCOUNT', payload: response });
    return response;
};
export const DeleteAccountAction = (id) => async (dispatch) => {
  try {
    const data = await AccountService().DeleteAccount(id);
    dispatch({ type: 'DELETE_ACCOUNT', payload: data.data });
    return data
  } catch (error) {
    return error
  }
};
