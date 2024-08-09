import { AppDispatch } from "../../app/store";
import { IBets } from "./ interfaces";
import { placeBet, updateBet } from "./rpsSlice";

export default class RpsService {
    public static placeBet(dispatch: AppDispatch, bet: number) {
        dispatch(placeBet(bet));
    }

    public static updateBet(
        dispatch: AppDispatch,
        type: keyof IBets,
        amount: number
    ) {
        dispatch(updateBet({ type, amount }));
    }

    public static formatNumber(num: number): string | number {
        if (num < 1000) return num;

        const formattedNum = (num / 1000).toFixed(1);
        return `${formattedNum}k`;
    }
}
