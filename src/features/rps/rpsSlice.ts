import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    GameStage,
    IBets,
    IPartialRpsMatchState,
    IRpsState,
} from "./ interfaces";
import { MINIMUM_BET, MAXIMUM_BET } from "../../lib/constants";

const initialState: IRpsState = {
    minimumBet: MINIMUM_BET,
    maximumBet: MAXIMUM_BET,
    userBets: {},
    computerChoice: undefined,
    playerChoice: undefined,
    winingPosition: undefined,
    tie: false,
    winAmount: undefined,
    gameStage: GameStage.SELECTING_BETS,
};

const rpsSlice = createSlice({
    name: "rps",
    initialState,
    reducers: {
        updateGameStage: (state, { payload }: PayloadAction<GameStage>) => ({
            ...state,
            gameStage: payload,
        }),
        updateUserBets: (state, { payload }: PayloadAction<IBets>) => ({
            ...state,
            userBets: {
                ...state.userBets,
                ...payload,
            },
        }),
        updateMatchOutcome: (
            state,
            { payload }: PayloadAction<IPartialRpsMatchState>
        ) => {
            return {
                ...state,
                ...payload,
            };
        },
        clearRpsState: () => ({ ...initialState }),
    },
});

export const {
    updateGameStage,
    updateUserBets,
    updateMatchOutcome,
    clearRpsState,
} = rpsSlice.actions;

export default rpsSlice.reducer;
