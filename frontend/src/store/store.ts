import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskReducer from "./tasks/taskSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tasks"],// not persisting the tasks 
};

const rootReducer=combineReducers({
    auth:authReducer,
    tasks:taskReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:{ ignoredActions: [
    'persist/PERSIST',
    'persist/REHYDRATE',
    'persist/REGISTER',
    'persist/FLUSH',
    'persist/PAUSE',
    'persist/PURGE',
  ],}})

})


export const persistor = persistStore(store);
export default store;