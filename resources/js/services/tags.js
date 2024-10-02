import api from './api';

export default {
  getTags() {
    return api.get('/tags');
  },
  createTag(tagData) {
    return api.post('/tags', tagData);
  },

};
