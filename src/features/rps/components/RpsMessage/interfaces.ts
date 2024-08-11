import { BetType } from "../../ interfaces";

export interface IRpsMessageProps {
    computerChoice?: BetType;
    playerChoice?: BetType;
    winingPosition?: BetType;
    winAmount?: number;
    tie?: boolean;
}
