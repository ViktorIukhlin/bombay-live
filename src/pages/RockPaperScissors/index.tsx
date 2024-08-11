import styles from "./RockPaperScissors.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

import UserService from "../../features/user/userService";
import RpsService from "../../features/rps/rpsService";
import RpsHeader from "../../features/rps/components/RpsHeader";
import RpsWrapper from "../../features/rps/components/RpsWrapper";
import RpsMessage from "../../features/rps/components/RpsMessage";

import RpsCard from "../../features/rps/components/RpsCard";
import Button from "../../components/Button";
import { IRpsCardCallbackProps } from "../../features/rps/components/RpsCard/interfaces";
import { ButtonText } from "../../features/rps/constants";
import { BetType, GameStage } from "../../features/rps/enums";

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
        maximumBet,
        userBets,
        computerChoice,
        playerChoice,
        winingPosition,
        tie,
        winAmount,
        gameStage,
    } = useSelector((state: RootState) => state.rps);

    useEffect(() => {
        // Setting up initial data for the user
        UserService.loadUserData(dispatch);
    }, [dispatch]); // Dispatch is stable and won't change between renders

    const handleRpsCardClick = ({
        betType,
        currentBet,
    }: IRpsCardCallbackProps) => {
        if (gameStage === GameStage.SELECTING_BETS) {
            RpsService.updateUserBets(
                dispatch,
                betType,
                currentBet,
                minimumBet,
                maximumBet,
                userBets,
                balance
            );
        }
    };

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
                    name={BetType.ROCK}
                    bet={userBets[BetType.ROCK]}
                    active={winingPosition === BetType.ROCK}
                    callback={handleRpsCardClick}
                />
                <RpsCard
                    testId="rps-paper-card"
                    color="green"
                    name={BetType.PAPER}
                    bet={userBets[BetType.PAPER]}
                    active={winingPosition === BetType.PAPER}
                    callback={handleRpsCardClick}
                />
                <RpsCard
                    testId="rps-scissors-card"
                    color="red"
                    name={BetType.SCISSORS}
                    bet={userBets[BetType.SCISSORS]}
                    active={winingPosition === BetType.SCISSORS}
                    callback={handleRpsCardClick}
                />
            </div>
            <div className={buttonContainer}>
                <Button
                    type="dark"
                    text={ButtonText[gameStage]}
                    callback={() => {
                        if (gameStage === GameStage.SELECTING_BETS) {
                            RpsService.handlePlayButtonClick(
                                dispatch,
                                userBets
                            );
                        } else {
                            RpsService.clearRpsState(dispatch);
                        }
                    }}
                    disabled={
                        gameStage === GameStage.CALCULATING_RESULTS ||
                        !Object.keys(userBets).length
                    }
                />
            </div>
        </RpsWrapper>
    );
};
export default RockPaperScissors;
