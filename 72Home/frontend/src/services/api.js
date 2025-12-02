// api.js
// API service for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://2szqn6js-8080.euw.devtunnels.ms';

/**
 * Submit property evaluation form to backend
 * @param {Object} payload - JSON payload matching EmailRequestDTO structure
 * @returns {Promise<Object>} Server response with property valuation
 * @throws {Error} If request fails
 */
export const submitPropertyEvaluation = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/form-submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.details || 
        errorData.error || 
        `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Generic API request helper
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};
