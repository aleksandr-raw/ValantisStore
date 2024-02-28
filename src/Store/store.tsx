import {configureStore} from "@reduxjs/toolkit";
import {api} from "../API/api";
import {ErrorMiddleware} from "./midleware";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, ErrorMiddleware)
});
