import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./interfaces";

const initialState: IUserState = {
    balance: 0,
    totalWins: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, { payload }: PayloadAction<IUserState>) => ({
            ...state,
            ...payload,
        }),
        increaseBalance: (state, { payload }: PayloadAction<number>) => ({
            ...state,
            balance: state.balance + payload,
        }),
        decreaseBalance: (state, { payload }: PayloadAction<number>) => ({
            ...state,
            balance: state.balance - payload,
        }),
        increaseTotalWins: (state) => ({
            ...state,
            totalWins: ++state.totalWins,
        }),
    },
});

export const {
    setUserData,
    increaseBalance,
    decreaseBalance,
    increaseTotalWins,
} = userSlice.actions;

export default userSlice.reducer;
