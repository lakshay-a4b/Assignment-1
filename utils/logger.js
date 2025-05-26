import axios from 'axios';

export const logEventToProducer = async (eventName, userId, properties = {}) => {
  try {
    const payload = {
      eventName,
      userId,
      properties,
    };

    const response = await axios.post('http://18.206.244.146:3001/event', payload);
    console.log('Event sent to Producer:', response.status);
  } catch (err) {
    console.error('Failed to send event to Producer:', err.message);
  }
};