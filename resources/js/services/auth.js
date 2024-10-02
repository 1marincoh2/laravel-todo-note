import api from './api';

export default {
//   login(credentials) {
//     return api.post('/login', credentials);
//   },

login(credentials) {
    return api.post('/login', credentials)
      .then(response => response.data) // Asegúrate de obtener el `data` correcto del response.
      .catch(error => {
        throw new Error(error.response.data.message || 'Error during login'); // Maneja errores adecuadamente
      });
  },
  register(userData) {
    return api.post('/register', userData);
  },
  logout() {
    return api.post('/logout');
  },
  getCurrentUser() {
    return api.get('/user');
  }
};
