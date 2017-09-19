import api from '../api/Todo.api';

export default {
  getAll: () => api.get('/todos'),
  getOne: id => api.get(`/todos/${id}`),
  create: todo => api.post('/todos/', todo),
  update: todo => api.put(`/todos/${todo.id}`, todo),
  delete: id => api.delete(`/todos/${id}`),
};
