import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./interfaces";

const initialState: IUserState = {
    balance: 0,
    totalWin: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        updateTotalWin: (state, action: PayloadAction<number>) => {
            state.totalWin += action.payload;
        },
    },
});

export const { setBalance, updateTotalWin } = userSlice.actions;

export default userSlice.reducer;
