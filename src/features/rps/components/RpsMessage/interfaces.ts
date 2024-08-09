import { BetType } from "../../ interfaces";

export interface IRpsMessageProps {
    computerChoice?: BetType;
    playerChoice?: BetType;
    winningPosition?: BetType;
    winAmount?: number;
    tie?: boolean;
}
