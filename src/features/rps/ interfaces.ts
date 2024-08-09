export enum BetType {
    rock = "ROCK",
    paper = "PAPER",
    scissors = "SCISSORS",
}

export interface IBets {
    rock: number;
    paper: number;
    scissors: number;
}

export interface IRpsState {
    bet: number;
    bets: IBets;
}
