/*eslint-disable*/
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
import { UserServices } from '../../services/user/index';
import { useNavigate } from 'react-router-dom';

export const UserActionLogin = (username, password) => {
  return async (dispatch) => {
    const response = await UserServices().login(username, password);
    console.log(response);
    try {
      const { access_token, refresh_token } = response?.data || {};

      if (!access_token) {
        throw new Error('Invalid JWT token');
      }
      console.log(decodeJwt(access_token));
      const { Roles } = decodeJwt(access_token);
      const { exp } = decodeJwt(access_token);
      console.log(exp);
      if (access_token && Roles[0] !== 'CANDIDATE') {
        storage.setCache('access_token', access_token);
        storage.setCache('refresh_token', refresh_token);
        dispatch({ type: 'LOGIN', payload: access_token });
      }
      return response;
    } catch (error) {
      error = response?.response?.message || 'An error occurred. Please try again later.';
      throw Error(error);
    }
  };
};
export const candidateActionLogin = (email, password) => {
  return async (dispatch) => {
    const response = await UserServices().login(email, password);
    try {
      const { access_token } = response?.data;
      const { Roles } = decodeJwt(access_token);
      if (access_token && Roles[0] === 'CANDIDATE') {
        storage.setCache('access_token', access_token);
        dispatch({ type: 'CANDIDATE_LOGIN', payload: access_token });
      }
      return response;
    } catch (error) {
      error = response?.response?.message;
      throw Error(error);
    }
  };
};
export const UserActionLogout = () => {
  return async (dispatch) => {
    try {
      await UserServices().logout();
      storage.removeCache('access_token');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log(error);
    }
  };
};
export const CandidateRegister = (data) => {
  return async (dispatch) => {
    const response = await UserServices().register(data);
    dispatch({ type: 'REGISTER', payload: response });
    return response;
  };
};

export const UserActionRefreshToken = (refreshToken) => {
  return async (dispatch) => {
    try {
      const response = await UserServices().refreshToken(refreshToken);
      const { access_token } = response?.data;
      storage.setCache('access_token', access_token);
      dispatch({ type: 'REFRESHTOKEN' });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GetUserIdAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await UserServices().GetUserId(id);
      dispatch({ type: 'GET_USERID', payload: data });
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const UpdateUserIdAction = (data) => {
  return async (dispatch) => {
    try {
      const updatedUser = await UserServices().UpdateUserId(data);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  };
};
export const GetUserAvatarIdAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await UserServices().GetUserAvatarId(id);
      dispatch({ type: 'GET_USER_AVATARID', payload: data });
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const UpdateUserAvatarIdAction = (data) => {
  return async (dispatch) => {
    try {
      const updatedUserAvatar = await UserServices().UpdateUserAvatarId(data);
      dispatch({ type: 'UPDATE_USER_AVATARID', payload: updatedUserAvatar });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const uploadImageAvatar = (formData, userId) => {
  return async (dispatch) => {
    try {
      const data = await UserServices().UploadFileAvatar(formData, userId);
      dispatch({ type: 'UPLOAD_SUCCESS', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };
};
export const ChangePasswordAction = (data) => {
  return async (dispatch) => {
    const changePass = await UserServices().ChangePassword(data);
    dispatch({ type: 'CHANGE_PASSWORD', payload: changePass });
    return changePass;
  };
};
