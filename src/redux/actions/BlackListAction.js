/*eslint-disable*/

import { BlacklistService } from '../../services/blacklist';

export const GetBlacklistAction = (page, limit) => {
  return async (dispatch) => {
    try {
      const data = await BlacklistService().GetBlacklist(page, limit);

      dispatch({ type: 'GET_BLACKLIST', payload: data.listBlackList });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetBlacklistIdAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await BlacklistService().GetBlacklistId(id);
      dispatch({ type: 'GET_BLACKLIST_ID', payload: data });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const UpdateBlacklistIdAction = (data) => {
  return async (dispatch) => {
    try {
      const updatedBlacklist = await BlacklistService().UpdateBlacklistId(data);
      dispatch({ type: 'UPDATE_BLACKLIST', payload: updatedBlacklist });
    } catch (error) {
      console.log(error);
    }
  };
};

export const CreateBlacklistAction = (data) => {
  return async (dispatch) => {
    try {
      const createBlacklist = await BlacklistService().CreateBlacklist(data);
      dispatch({ type: 'CREATE_BLACKLIST', payload: createBlacklist });
      return createBlacklist;
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeleteBlacklistAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await BlacklistService().DeleteBlacklist(id);
      dispatch({ type: 'DELETE_BLACKLIST', payload: data.data });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
