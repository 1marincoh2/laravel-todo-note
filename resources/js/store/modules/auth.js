import authService from '../../services/auth';

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem('token') || null
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const { access_token ,user_id} = await authService.login(credentials);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_id', user_id);

      commit('SET_TOKEN', access_token);
    //   commit('SET_USER', user);
    },
    async register({ commit }, userData) {
      const { token, user } = await authService.register(userData);
      localStorage.setItem('token', token);
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    async logout({ commit }) {
      await authService.logout();
      localStorage.removeItem('token');
      commit('CLEAR_AUTH');
    },
    async checkAuth({ commit, state }) {
      if (state.token) {
        try {
          const user = await authService.getCurrentUser();
          commit('SET_USER', user);
        } catch (error) {
          commit('CLEAR_AUTH');
        }
      }
    }
  }
};
