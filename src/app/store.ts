// src/store.ts
import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import { api } from "../features/Auth/authApi";
import authReducer from '../features/slices/authSlice';
import { vehiclesApi } from "../features/Vehicles/VehicleApi";
import { usersApi } from "../features/Users/usersApi";
import cartSlice from "../features/Cart/cartSlice";
import { bookingApi } from "../features/Booking/bookingApi";
import { paymentsApi } from "../features/payments/paymentsAPI";
import { locationApi } from "../features/locations/locationsAPi";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer: Reducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,




  cart: cartSlice


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
      usersApi.middleware,
      bookingApi.middleware,
      paymentsApi.middleware,
      locationApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
