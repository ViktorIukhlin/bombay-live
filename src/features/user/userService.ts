import { AppDispatch } from "../../app/store";
import { setBalance, updateTotalWin } from "./userSlice";

export default class UserService {
    public static setBalance(dispatch: AppDispatch, balance: number) {
        dispatch(setBalance(balance));
    }

    public static updateTotalWin(dispatch: AppDispatch, win: number) {
        dispatch(updateTotalWin(win));
    }
}
