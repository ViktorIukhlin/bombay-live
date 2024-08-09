export interface IBets {
    rock: number;
    paper: number;
    scissors: number;
}

export interface IRpsState {
    bet: number;
    bets: IBets;
}
