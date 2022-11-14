import axios from 'axios';

const baseURL = 'http://172.28.6.127:3001';

const getAllArticles = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/20261900/articles`);
    return response.data.article;
  } catch (error) {
    throw error;
  }
};

const getSingleArticle = async (id) => {
  const response = await axios.get(`${baseURL}/api/20261900/articles/${id}`);
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

const createArticle = async (data) => {
  const response = await axios.post(`${baseURL}/api/20261900/create`, data);
  return response;
}

const updateArticle = async (id, data) => {
  const response = await axios.put(`${baseURL}/api/20261900/update/${id}`, data);
  return response;
};

const deleteArticle = async (id) => {
  const response = await axios.delete(`${baseURL}/api/20261900/delete/${id}`);
  return response;
}

const getArticleByCategory = async (category) => {
  const response = await axios.get(`${baseURL}/api/20261900/get/${category}`);
  return response;
}

const ArticleService = {
    getAllArticles: getAllArticles,
    getSingleArticle: getSingleArticle,
  uploadImage,
  createArticle: createArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle,
  getArticleByCategory,
};

export default ArticleService;
