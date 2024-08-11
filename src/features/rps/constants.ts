import { GameStage } from "./enums";

export const MINIMUM_BET = 500;
export const MAXIMUM_BET = null;
export const MAX_SELECTABLE_POSITIONS = 2;
export const WINNING_RATE_FOR_ONE_POSITION = 14;
export const WINNING_RATE_FOR_TWO_POSITIONS = 3;

export const ButtonText = {
    [GameStage.SELECTING_BETS]: "PLAY",
    [GameStage.CALCULATING_RESULTS]: "PLAY",
    [GameStage.SHOWING_RESULTS]: "CLEAR",
};
