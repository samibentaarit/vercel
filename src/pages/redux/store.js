
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { commentsApi } from '../redux/slices/commentsApi';
import { eventsApi } from '../redux/slices/eventsApi';
import ticketSlice from './slices/ticketsSlice'

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
    tickets: ticketSlice,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware).concat(eventsApi.middleware),

});

export const persistor = persistStore(store);



/*
import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { commentsApi } from '../redux/slices/commentsApi';
import { eventsApi } from '../redux/slices/eventsApi';
import { ticketsSlice } from '../redux/slices/ticketsSlice';

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [ticketsSlice.reducerPath]: ticketsSlice.actions.reducer,


  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, commentsApi.middleware, eventsApi.middleware),
});

export const persistor = persistStore(store);
*/
