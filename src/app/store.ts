import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import rpsReducer from "../features/rps/rpsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        rps: rpsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
