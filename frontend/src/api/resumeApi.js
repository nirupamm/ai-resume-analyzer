import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const analyzeResume = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload-resume/`, formData);
  return response.data;
};

export const rewriteResume = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/rewrite-resume/`, formData);
  return response.data;
};

export const generateCoverLetter = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/generate-cover-letter/`,
    formData
  );
  return response.data;
};

export const getAnalyses = async () => {
  const response = await axios.get(`${API_BASE_URL}/analyses/`);
  return response.data;
};

export const getStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/stats/`);
  return response.data;
};