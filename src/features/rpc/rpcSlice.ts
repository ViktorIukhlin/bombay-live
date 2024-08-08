import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBets, IRpcState } from "./ interfaces";

const initialState: IRpcState = {
    bet: 0,
    bets: {
        rock: 0,
        paper: 0,
        scissors: 0,
    },
};

const rpcSlice = createSlice({
    name: "rpc",
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

export const { placeBet, updateBet } = rpcSlice.actions;

export default rpcSlice.reducer;
