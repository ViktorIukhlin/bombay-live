import { useLoaderData, defer, Await } from "react-router-dom";
import { getUserData } from "../../lib/api";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

import UserService from "../../features/user/userService";
import RpsService from "../../features/rps/rpsService";
import Header from "../../features/rps/components/Header";

const ScissorsRockPaper = (): JSX.Element => {
    const loaderData = useLoaderData() as { balance: number };
    const balance = useSelector((state: RootState) => state.user.balance);
    const totalWin = useSelector((state: RootState) => state.user.totalWin);
    const rps = useSelector((state: RootState) => state.rps);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <Header balance={1000} bet={1000} win={100} />
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
                <h2>RPS Bet: {rps.bet}</h2>
                <button onClick={() => RpsService.placeBet(dispatch, 100)}>
                    Place Bet 100
                </button>
                <h3>Bets</h3>
                <p>Rock: {rps.bets.rock}</p>
                <button
                    onClick={() => RpsService.updateBet(dispatch, "rock", 10)}
                >
                    Bet 10 on Rock
                </button>
                <p>Paper: {rps.bets.paper}</p>
                <button
                    onClick={() => RpsService.updateBet(dispatch, "paper", 10)}
                >
                    Bet 10 on Paper
                </button>
                <p>Scissors: {rps.bets.scissors}</p>
                <button
                    onClick={() =>
                        RpsService.updateBet(dispatch, "scissors", 10)
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
