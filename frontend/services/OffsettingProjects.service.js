import axios from 'axios';

const baseURL = 'http://192.168.72.141:3001';

const getAllOffsettingProjects = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/20911744/offsettingprojects`);
    return response.data.projects;
  } catch (error) {
    throw error;
  }
};

const getOffsettingProject = async (id) => {
  const response = await axios.get(`${baseURL}/api/20911744/offsettingprojects/${id}`);
  return response.data;
};

const uploadImage = async (image) => {
  const response = await axios.post(
    `https://api.imgur.com/3/image`,
    {
      image,
      type: 'base64',
    },
    {
      headers: {
        Authorization: 'Client-ID 0604b5980e3ed1d',
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const createOffsettingProject = async (data) => {
  const response = await axios.post(`${baseURL}/api/20911744/create`, data);
  return response;
}

const updateOffsettingProject = async (id, data) => {
  const response = await axios.put(`${baseURL}/api/20911744/update/${id}`, data);
  return response;
};

const deleteOffsettingProject = async (id) => {
  const response = await axios.delete(`${baseURL}/api/20911744/delete/${id}`);
  return response;
}

const OffsettingProjectsService = {
  getAllOffsettingProjects,
  getOffsettingProject,
  uploadImage,
  createOffsettingProject,
  updateOffsettingProject,
  deleteOffsettingProject
};

export default OffsettingProjectsService;
