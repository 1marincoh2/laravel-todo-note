import api from './api';


export default {
    getNotes() {
      return api.get('/notes');
    },
    getNote(id) {
      return api.get(`/notes/${id}`);
    },
    createNote(noteData) {
        // Verificar que noteData sea FormData
        if (!(noteData instanceof FormData)) {
          console.error('noteData must be FormData');
          return Promise.reject(new Error('Invalid data format'));
        }

        return api.post('/notes', noteData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },

    updateNote(id, noteData) {
      let data = noteData;
      let headers = {};
      let method = api.put;

      // Uso de FormData y POST si hay una imagen nueva
      if (noteData.image instanceof File) {
        data = new FormData();
        data.append('_method', 'PUT');
        Object.keys(noteData).forEach(key => {
          if (key === 'tags' && Array.isArray(noteData[key])) {
            noteData[key].forEach(tag => data.append('tags[]', tag));
          } else {
            data.append(key, noteData[key]);
          }
        });
        headers['Content-Type'] = 'multipart/form-data';
        method = api.post; // POST para FormData con _method=PUT
      }

      return method(`/notes/${id}`, data, { headers });
    },
    deleteNote(id) {
      return api.delete(`/notes/${id}`);
    }
  };
