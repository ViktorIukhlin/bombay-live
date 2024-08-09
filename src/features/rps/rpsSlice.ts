import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBets, IRpsState } from "./ interfaces";

const initialState: IRpsState = {
    bet: 0,
    bets: {
        rock: 0,
        paper: 0,
        scissors: 0,
    },
};

const rpsSlice = createSlice({
    name: "rps",
    initialState,
    reducers: {
        placeBet: (state, action: PayloadAction<number>) => {
            state.bet = action.payload;
        },
        updateBet: (
            state,
            action: PayloadAction<{ type: keyof IBets; amount: number }>
        ) => {
            state.bets[action.payload.type] += action.payload.amount;
        },
    },
});

export const { placeBet, updateBet } = rpsSlice.actions;

export default rpsSlice.reducer;
