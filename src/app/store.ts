// src/store.ts
import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import { api } from "../features/Auth/authApi";
import authReducer from '../features/slices/authSlice';
import { vehiclesApi } from "../features/Vehicles/VehicleApi";
import { usersApi } from "../features/Users/usersApi";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer: Reducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      api.middleware,
      vehiclesApi.middleware,
      usersApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
