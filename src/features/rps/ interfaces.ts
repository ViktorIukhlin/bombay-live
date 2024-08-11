import { BetType, GameStage, MatchResult } from "./enums";

export type IBets = {
    [key in BetType]?: number;
};

export interface IRpsSettings {
    minimumBet: number;
    maximumBet: number | null;
}

export interface IRpsMatchState {
    userBets: IBets;
    computerChoice?: BetType;
    playerChoice?: BetType;
    winingPosition?: BetType;
    tie?: boolean;
    winAmount?: number;
}

export interface IRpsState extends IRpsSettings, IRpsMatchState {
    gameStage: GameStage;
}

export type IPartialRpsMatchState = Partial<IRpsState>;

export interface IUserResult {
    bestPlayerChoice: BetType;
    playerBet: number;
    matchResult: MatchResult;
}
