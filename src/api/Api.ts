import axiosInstance from '@api/axios';

class Api {
  getPostsPerPage = (page: number) =>
    axiosInstance.get(`/posts`, {
      params: { limit: 10, skip: page },
    });

  getAllUsers = () =>
    axiosInstance.get(`/users`, {
      params: { limit: 100 },
    });
}

export default new Api();
