import { AppDispatch } from "../app/store";
import { IBets } from "../features/rpc/ interfaces";
import { placeBet, updateBet } from "../features/rpc/rpcSlice";

export default class RpcService {
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
