export enum BetType {
    rock = "ROCK",
    paper = "PAPER",
    scissors = "SCISSORS",
}

export enum GameStage {
    SELECTING_BETS = "SELECTING_BETS",
    CALCULATING_RESULTS = "CALCULATING_RESULTS",
    SHOWING_RESULTS = "SHOWING_RESULTS",
}

export enum MatchResult {
    WIN = "WIN",
    TIE = "TIE",
    LOSE = "LOSE",
}

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
