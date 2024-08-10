import styles from "./RockPaperScissors.module.scss";

import { useLoaderData, defer, Await } from "react-router-dom";
import { getUserData } from "../../lib/api";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

import UserService from "../../features/user/userService";
import RpsService from "../../features/rps/rpsService";
import RpsHeader from "../../features/rps/components/RpsHeader";
import RpsWrapper from "../../features/rps/components/RpsWrapper";
import RpsMessage from "../../features/rps/components/RpsMessage";
import { BetType } from "../../features/rps/ interfaces";
import RpsCard from "../../features/rps/components/RpsCard";
import Button from "../../components/Button";

const RockPaperScissors = (): JSX.Element => {
    const { rpsCardContainer, buttonContainer } = styles;

    const loaderData = useLoaderData() as { balance: number };
    const balance = useSelector((state: RootState) => state.user.balance);
    const totalWin = useSelector((state: RootState) => state.user.totalWin);
    const rps = useSelector((state: RootState) => state.rps);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <RpsWrapper>
            <RpsHeader balance={1000} bet={1000} win={100} />
            <RpsMessage
                computerChoice={"ROCK" as BetType}
                playerChoice={"PAPER" as BetType}
                winningPosition={"PAPER" as BetType}
                winAmount={500}
                tie={true}
            />

            <div className={rpsCardContainer}>
                <RpsCard
                    testId="rps-rock-card"
                    name={BetType.rock}
                    color="blue"
                    bet={500}
                    callback={(name) => {
                        console.log(name);
                    }}
                />
                <RpsCard
                    testId="rps-paper-card"
                    name={BetType.paper}
                    color="green"
                    bet={11600}
                    active={true}
                    callback={(name) => {
                        console.log(name);
                    }}
                />
                <RpsCard
                    testId="rps-scissors-card"
                    name={BetType.scissors}
                    color="red"
                    callback={(name) => {
                        console.log(name);
                    }}
                />
            </div>

            <div className={buttonContainer}>
                <Button
                    type="dark"
                    text="PLAY"
                    callback={() => {
                        console.log("XXX");
                    }}
                    disabled={true}
                />
            </div>

            <div>RockPaperScissors</div>
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
        </RpsWrapper>
    );
};
export default RockPaperScissors;

export function dependencies() {
    return defer({ balance: getUserData() });
}
