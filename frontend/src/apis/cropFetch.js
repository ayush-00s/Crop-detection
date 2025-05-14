import axios from 'axios';

export const fetchCropData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-info`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching crop data:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch crop data'
    };
  }
};

// Mock data for development/testing
export const getMockData = () => ({
  success: true,
  data: {
    soil: {
      moisture: '45%',
      temperature: '25°C',
      humidity: '60%'
    },
    air: {
      humidity: '55%',
      temperature: '28°C',
      windSpeed: '10 km/h'
    },
    weather: {
      temperature: '28',
      location: 'Rampur'
    }
  }
});
