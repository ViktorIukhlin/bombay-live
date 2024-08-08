import { useLoaderData, defer, Await } from "react-router-dom";
import { getUserData } from "../../lib/api";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import UserService from "../../services/userService";
import RpcService from "../../services/rpcService";

const ScissorsRockPaper = (): JSX.Element => {
    const loaderData = useLoaderData() as { balance: number };
    const balance = useSelector((state: RootState) => state.user.balance);
    const totalWin = useSelector((state: RootState) => state.user.totalWin);
    const rpc = useSelector((state: RootState) => state.rpc);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <div>ScissorsRockPaper</div>
            <div>
                <h1>User Balance: {balance}</h1>
                <button
                    onClick={() =>
                        UserService.setBalance(dispatch, balance + 10)
                    }
                >
                    Add 10 to Balance
                </button>
                <h2>Total Wins: {totalWin}</h2>
                <button
                    onClick={() => UserService.updateTotalWin(dispatch, 50)}
                >
                    Add 50 to Total Wins
                </button>
                <h2>RPC Bet: {rpc.bet}</h2>
                <button onClick={() => RpcService.placeBet(dispatch, 100)}>
                    Place Bet 100
                </button>
                <h3>Bets</h3>
                <p>Rock: {rpc.bets.rock}</p>
                <button
                    onClick={() => RpcService.updateBet(dispatch, "rock", 10)}
                >
                    Bet 10 on Rock
                </button>
                <p>Paper: {rpc.bets.paper}</p>
                <button
                    onClick={() => RpcService.updateBet(dispatch, "paper", 10)}
                >
                    Bet 10 on Paper
                </button>
                <p>Scissors: {rpc.bets.scissors}</p>
                <button
                    onClick={() =>
                        RpcService.updateBet(dispatch, "scissors", 10)
                    }
                >
                    Bet 10 on Scissors
                </button>
            </div>
            <Suspense fallback={<p> Loading ....</p>}>
                <Await resolve={loaderData.balance} errorElement={<p>s</p>}>
                    {({ balance }) => <div>{balance}</div>}
                </Await>
            </Suspense>
        </div>
    );
};
export default ScissorsRockPaper;

export function dependencies() {
    return defer({ balance: getUserData() });
}
