export interface IBets {
    rock: number;
    paper: number;
    scissors: number;
}

export interface IRpcState {
    bet: number;
    bets: IBets;
}
