
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import blogReducer from './blogSlice'; // Your blog slice

// Persist configuration
const persistConfig = {
  key: 'root', // The key for the persist store
  storage, // Use local storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, blogReducer);

const store = configureStore({
  reducer: {
    blog: persistedReducer, // Use the persisted reducer
    // other reducers...
  },
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
