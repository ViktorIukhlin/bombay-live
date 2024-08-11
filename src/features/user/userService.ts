import { AppDispatch } from "../../app/store";
import { getUserData } from "../../lib/api";
import { MatchResult } from "../rps/ interfaces";
import { increaseBalance, setUserData, increaseTotalWins } from "./userSlice";

export default class UserService {
    public static async loadUserData(dispatch: AppDispatch) {
        const response = await getUserData();

        dispatch(setUserData(response));
    }

    public static updateBalance(
        dispatch: AppDispatch,
        matchResult: MatchResult,
        winAmount: number | undefined,
        playerBet: number
    ) {
        if (winAmount) {
            // If there is a win, we add it to the balance
            dispatch(increaseBalance(winAmount));
        } else if (matchResult === MatchResult.TIE) {
            // if it's a tie then we return the playerBet
            dispatch(increaseBalance(playerBet));
        }
    }

    public static increaseTotalWins(dispatch: AppDispatch, win: number) {
        dispatch(increaseTotalWins());
    }
}
