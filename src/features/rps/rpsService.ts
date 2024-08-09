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
}
