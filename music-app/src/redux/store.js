import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./slice/playerSlice";
import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import storage from "redux-persist/lib/storage";
import {
    persistReducer, FLUSH, PAUSE, PERSIST,
    PURGE, REGISTER, REHYDRATE,
}
    from "redux-persist";

const persistConfig = { key: "root", storage, version: 1 };

const reducers = combineReducers({
    player: playerReducer,
    user: userReducer,
    modal: modalReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
            },
        }),
});