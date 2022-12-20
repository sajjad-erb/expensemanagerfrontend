import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice";
import { accountApi } from "./api/accountApi";
import { walletApi } from "./api/walletApi";
import { transactionApi } from "./api/transactionApi";
import storage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { groupExpenseApi } from "./api/groupExpenseApi";
import { userApi } from "./api/userApi";
import { groupApi } from "./api/groupApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [groupExpenseApi.reducerPath]: groupExpenseApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(accountApi.middleware, walletApi.middleware, transactionApi.middleware, groupExpenseApi.middleware, userApi.middleware,
    groupApi.middleware),
});

export const persistor = persistStore(store);
export default store;
setupListeners(store.dispatch);
