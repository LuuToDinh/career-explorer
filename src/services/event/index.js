import { useApi } from '../api';
import { BASE_URL } from '../../constant/ActionType';

export const EventService = () => {
  const api = useApi(BASE_URL, true);
  return {
    GetEvent: async (page, limit) => {
      const response = await api.get(`/public/event/view?page=${page}&limit=${limit}`);
      return response.data;
    },
    GetEventDetail: async (id) => {
      const response = await api.get(`/public/events/${id}`);
      return response.data;
    },
    AddEvent: async (data) => {
      try {
        const response = await api.post(`/reccer/events/create`, data);
        return response.data;
      } catch (error) {
        return error
      }
    },
    UpdateEventId: async (data) => {
      try {
        const response = await api.put(`/reccer/events/event_id/update`, data);
        return response.data;
      } catch (error) {
        return error
      }
    },
    DeleteEvent: async (id) => {
      const response = await api.delete(`/reccer/events/delete/${id}`);
      return response.data;
    },
    UploadFileMutate: async (formData, eventId) => {
      try {
        const response = await api.post(`/image/event/upload?eventId=${eventId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data; // Assuming the API returns some data upon successful upload
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error uploading files:', error);
        throw error;
      }
    },
  };
};
