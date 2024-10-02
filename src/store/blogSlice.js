// src/store/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    entries: [],
  },
  reducers: {
    addBlogEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    deleteBlogEntry: (state, action) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload.id);
    },
    updateBlogEntry: (state, action) => {
      const { id, content } = action.payload;
      const index = state.entries.findIndex(entry => entry.id === id);
      if (index !== -1) {
        // Update the entry's content
        state.entries[index].content = content;
      }
    }
    // You can add more reducers for fetching, deleting, etc.
  },
});

export const { addBlogEntry, deleteBlogEntry, updateBlogEntry } = blogSlice.actions;

export default blogSlice.reducer;
