/*eslint-disable*/

import { EventService } from '../../services/event';

export const GetEventAction = (page, limit) => {
  return async (dispatch) => {
    try {
      const data = await EventService().GetEvent(page, limit);
      dispatch({ type: 'GET_EVENT', payload: data.listGeneralEventInfoResponse });
    } catch (error) {
      console.log('Error this code', error);
    }
  };
};
export const GetEventDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await EventService().GetEventDetail(id);
      dispatch({ type: 'GET_EVENT_DETAIL', payload: data });
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const AddEventAction = (data) => {
  return async (dispatch) => {
    const addEvent = await EventService().AddEvent(data);
    dispatch({ type: 'ADD_EVENT', payload: addEvent });
    return addEvent;
  };
};
export const UpdateEventIdAction = (data) => {
  return async (dispatch) => {
    const updateEvent = await EventService().UpdateEventId(data);
    dispatch({ type: 'UPDATE_EVENT', payload: updateEvent });
    return updateEvent;
  };
};

  export const DeleteEventAction = (id) => {
    return async (dispatch) => {
      try {
        const data = await EventService().DeleteEvent(id);
        dispatch({ type: 'DELETE_EVENT', payload: data.data });
      } catch (error) {
        console.log('Error this code', error);
      }
    };
  };

  export const uploadImageFiles = (formData, eventId) => {
    return async (dispatch) => {
      try {
        const data = await EventService().UploadFileMutate(formData, eventId);
        dispatch({ type: 'UPLOAD_SUCCESS', payload: data });
        return data;
      } catch (error) {
        throw error;
      }
    };
  };
