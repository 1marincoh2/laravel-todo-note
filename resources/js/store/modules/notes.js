import notesService from '../../services/notes';


export default {
    namespaced: true,
    state: {
      notes: [],
      currentNote: null,
      error: null,
      isLoading: false
    },
    getters: {
      allNotes: state => state.notes,
      currentNote: state => state.currentNote,
      error: state => state.error,
      isLoading: state => state.isLoading
    },
    mutations: {
      SET_NOTES(state, notes) {
        state.notes = notes;
      },
      ADD_NOTE(state, note) {
        state.notes.unshift(note);
      },
      UPDATE_NOTE(state, updatedNote) {
        const index = state.notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
          state.notes.splice(index, 1, updatedNote);
        }
      },
      DELETE_NOTE(state, noteId) {
        state.notes = state.notes.filter(note => note.id !== noteId);
      },
      SET_CURRENT_NOTE(state, note) {
        state.currentNote = note;
      },
      SET_LOADING(state, isLoading) {
        state.isLoading = isLoading;
      },
      SET_ERROR(state, error) {
        state.error = error;
      }
    },
    actions: {
      async fetchNotes({ commit }) {
        commit('SET_LOADING', true);
        try {
          const { data } = await notesService.getNotes();
          commit('SET_NOTES', data);
        } catch (error) {
          commit('SET_ERROR', error);
        } finally {
          commit('SET_LOADING', false);
        }
      },
      async createNote({ commit }, noteData) {
        commit('SET_LOADING', true);
        try {
          const { data } = await notesService.createNote(noteData);
          commit('ADD_NOTE', data);
        } catch (error) {
          commit('SET_ERROR', error);
        } finally {
          commit('SET_LOADING', false);
        }
      },
      async updateNote({ commit }, { id, noteData }) {
        commit('SET_LOADING', true);
        try {
          const { data } = await notesService.updateNote(id, noteData);
          commit('UPDATE_NOTE', data);
        } catch (error) {
          commit('SET_ERROR', error);
        } finally {
          commit('SET_LOADING', false);
        }
      },
      async deleteNote({ commit }, noteId) {
        commit('SET_LOADING', true);
        try {
          await notesService.deleteNote(noteId);
          commit('DELETE_NOTE', noteId);
        } catch (error) {
          commit('SET_ERROR', error);
        } finally {
          commit('SET_LOADING', false);
        }
      },
      async fetchNote({ commit }, noteId) {
        commit('SET_LOADING', true);
        try {
          const { data } = await notesService.getNote(noteId);
          commit('SET_CURRENT_NOTE', data);
        } catch (error) {
          commit('SET_ERROR', error);
        } finally {
          commit('SET_LOADING', false);
        }
      }
    }
  };
