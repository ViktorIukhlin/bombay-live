import { BetType } from "../../ interfaces";

export type IColorType = "green" | "blue" | "red";

export interface IRpsCardCallbackProps {
    betType: BetType;
    currentBet: number;
}

export interface IRpsCardProps {
    testId: string;
    name: BetType;
    color: IColorType;
    active?: boolean;
    bet?: number;
    callback({ betType, currentBet }: IRpsCardCallbackProps): void;
}
