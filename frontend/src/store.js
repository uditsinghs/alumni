import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postReducer from './features/post/postSlice';
import jobReducer from './features/job/jobSlice'; // ✅ Correct this import
import eventReducer from './features/event/eventSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  job: jobReducer,     // ✅ Now using correct reducer
  event: eventReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
