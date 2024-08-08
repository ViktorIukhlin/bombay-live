import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import rpcReducer from "../features/rpc/rpcSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        rpc: rpcReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
