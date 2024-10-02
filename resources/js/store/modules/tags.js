import tagsService from '../../services/tags';

export default {
  namespaced: true,
  state: {
    tags: [],
    error: null,
  },
  getters: {
    allTags: (state) => state.tags,
    error: (state) => state.error,
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    ADD_TAG(state, tag) {
      state.tags.push(tag);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchTags({ commit }) {
      try {
        const { data } = await tagsService.getTags();
        commit('SET_TAGS', data);
        return data;
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async createTag({ commit }, tagData) {
      try {
        const { data } = await tagsService.createTag(tagData);
        commit('ADD_TAG', data);
        return data;
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  },
};
