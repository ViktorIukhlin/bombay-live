import { AppDispatch } from "../../app/store";
import {
    MAX_SELECTABLE_POSITIONS,
    WINNING_RATE_FOR_ONE_POSITION,
    WINNING_RATE_FOR_TWO_POSITIONS,
} from "./constants";
import { sleep } from "../../utils/sleep";
import UserService from "../user/userService";
import { decreaseBalance } from "../user/userSlice";
import { IBets, IUserResult } from "./ interfaces";
import {
    updateUserBets,
    updateMatchOutcome,
    updateGameStage,
    clearRpsState,
} from "./rpsSlice";
import { BetType, GameStage, MatchResult } from "./enums";

export default class RpsService {
    public static updateUserBets(
        dispatch: AppDispatch,
        betType: BetType,
        currentBet: number,
        minimumBet: number,
        maximumBet: number | null,
        userBets: IBets,
        balance: number
    ) {
        // Check if the betting limit for different positions has been reached and user has enough money on the balance
        if (
            (Object.keys(userBets).length >= MAX_SELECTABLE_POSITIONS &&
                !userBets.hasOwnProperty(betType)) ||
            balance - minimumBet < 0
        ) {
            return;
        }

        // Update value must be at least equal to minimumBet
        const updatedBet = currentBet + minimumBet;

        // Check if the bet limit on the current card has been reached
        if (maximumBet && updatedBet > maximumBet) return;

        dispatch(decreaseBalance(minimumBet));
        dispatch(updateUserBets({ [betType]: updatedBet }));
    }

    public static async handlePlayButtonClick(
        dispatch: AppDispatch,
        userBets: IBets
    ) {
        // Immediately set GameStage to CALCULATING_RESULTS mode in order to block the play button from being pressed again
        dispatch(updateGameStage(GameStage.CALCULATING_RESULTS));

        // Get all necessary data
        const computerChoice = this.getComputerChoice();
        const { bestPlayerChoice, playerBet, matchResult } =
            this.findBestUserChoice(userBets, computerChoice);

        // Set computerChoice and playerChoice to display the Versus message
        dispatch(
            updateMatchOutcome({
                computerChoice,
                playerChoice: bestPlayerChoice,
            })
        );

        // Wait 2 seconds for the player to see the message
        await sleep(2000);

        // If the result is a win, then here we will get the correct amount
        const winAmount = this.getWinAmount(matchResult, userBets, playerBet);

        // Update state with result data
        dispatch(
            updateMatchOutcome({
                winingPosition:
                    matchResult === MatchResult.WIN
                        ? bestPlayerChoice
                        : computerChoice,
                winAmount,
                tie: matchResult === MatchResult.TIE,
                gameStage: GameStage.SHOWING_RESULTS,
            })
        );

        // Update player balance and win count
        UserService.updateBalanceAndWin(
            dispatch,
            matchResult,
            winAmount,
            playerBet
        );
    }

    public static clearRpsState(dispatch: AppDispatch) {
        dispatch(clearRpsState());
    }

    // Format the number from numeric to string to save space
    // Example: 1500 -> 1.5k; 2000 -> 2k; 500 -> 500
    public static formatNumber(num: number): string | number {
        if (num < 1000) return num;

        const formattedNum = (num / 1000).toFixed(1);
        return `${formattedNum}k`;
    }

    // Calculate the amount the player won
    private static getWinAmount(
        matchResult: MatchResult,
        userBets: IBets,
        playerBet: number
    ): number | undefined {
        if (matchResult === MatchResult.WIN && playerBet) {
            if (Object.keys(userBets).length > 1) {
                return playerBet * WINNING_RATE_FOR_TWO_POSITIONS;
            } else {
                return playerBet * WINNING_RATE_FOR_ONE_POSITION;
            }
        }

        return undefined;
    }

    // Generate a random computer choice
    private static getComputerChoice(): BetType {
        const choices = [BetType.ROCK, BetType.PAPER, BetType.SCISSORS];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Get the best user choice and match result
    private static findBestUserChoice(
        userBets: IBets,
        computerChoice: BetType
    ): IUserResult {
        const winMap: Record<BetType, BetType> = {
            [BetType.ROCK]: BetType.SCISSORS, // Rock beats Scissors
            [BetType.PAPER]: BetType.ROCK, // Paper beats Rock
            [BetType.SCISSORS]: BetType.PAPER, // Scissors beat Paper
        };
        const userChoices = Object.keys(userBets) as BetType[];
        const status: { [key: string]: IUserResult } = {};

        for (let choice of userChoices) {
            // First, try to find a choice that beats the computer's choice
            if (winMap[choice] === computerChoice) {
                status.win = {
                    bestPlayerChoice: choice,
                    playerBet: userBets[choice] || 0,
                    matchResult: MatchResult.WIN,
                };

                // If a win isn't possible, try to find a choice that results in a tie
            } else if (choice === computerChoice) {
                status.tie = {
                    bestPlayerChoice: choice,
                    playerBet: userBets[choice] || 0,
                    matchResult: MatchResult.TIE,
                };
            } else {
                // If neither a win nor a tie is possible, set a choice that will result in a loss
                status.lose = {
                    bestPlayerChoice: choice,
                    playerBet: 0,
                    matchResult: MatchResult.LOSE,
                };
            }
        }

        // If there is a bet on a win, we return it, if not, we return a tie, if not, we return a lose
        return status.win || status.tie || status.lose;
    }
}
