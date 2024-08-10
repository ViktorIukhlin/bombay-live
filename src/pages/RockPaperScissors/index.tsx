import styles from "./RockPaperScissors.module.scss";

import { useLoaderData, defer, Await } from "react-router-dom";
import { getUserData } from "../../lib/api";
import { Suspense, useEffect } from "react";
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
import { IUserState } from "../../features/user/interfaces";

const RockPaperScissors = (): JSX.Element => {
    const { rpsCardContainer, buttonContainer } = styles;
    const dispatch = useDispatch<AppDispatch>();

    // User State
    const { balance, totalWins } = useSelector(
        (state: RootState) => state.user
    );
    // Game State
    const {
        minimumBet,
        userBets,
        computerChoice,
        playerChoice,
        winingPosition,
        tie,
        winAmount,
    } = useSelector((state: RootState) => state.rps);

    useEffect(() => {
        // Setting up initial data for the user
        UserService.loadUserData(dispatch);
    }, [dispatch]); // Dispatch is stable and won't change between renders

    return (
        <RpsWrapper>
            <RpsHeader balance={balance} bet={minimumBet} win={totalWins} />
            <RpsMessage
                {...{
                    computerChoice,
                    playerChoice,
                    winingPosition,
                    tie,
                    winAmount,
                }}
            />

            <div className={rpsCardContainer}>
                <RpsCard
                    testId="rps-rock-card"
                    color="blue"
                    name={BetType.rock}
                    bet={userBets[BetType.rock]}
                    active={winingPosition === BetType.rock}
                    callback={(name) => {
                        console.log(name);
                    }}
                />
                <RpsCard
                    testId="rps-paper-card"
                    color="green"
                    name={BetType.paper}
                    bet={userBets[BetType.paper]}
                    active={winingPosition === BetType.paper}
                    callback={(name) => {
                        console.log(name);
                    }}
                />
                <RpsCard
                    testId="rps-scissors-card"
                    color="red"
                    name={BetType.scissors}
                    bet={userBets[BetType.scissors]}
                    active={winingPosition === BetType.scissors}
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
        </RpsWrapper>
    );
};
export default RockPaperScissors;
