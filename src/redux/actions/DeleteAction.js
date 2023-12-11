import { DeleteService } from '../../services/deleteall';

export const DeleteAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await DeleteService().DeleteReccer(id);
      dispatch({ type: 'DELETE_ALL', payload: data.data });
      console.log(data);
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
