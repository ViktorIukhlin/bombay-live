import { AppDispatch } from "../../app/store";
import {
    MAX_SELECTABLE_POSITIONS,
    WINNING_RATE_FOR_ONE_POSITION,
    WINNING_RATE_FOR_TWO_POSITIONS,
} from "../../lib/constants";
import { sleep } from "../../utils/sleep";
import UserService from "../user/userService";
import { decreaseBalance } from "../user/userSlice";
import {
    BetType,
    GameStage,
    IBets,
    IUserResult,
    MatchResult,
} from "./ interfaces";
import {
    updateUserBets,
    updateMatchOutcome,
    updateGameStage,
    clearRpsState,
} from "./rpsSlice";

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

        // Wait 3 seconds for the player to see the message
        await sleep(3000);

        const winAmount = this.getWinAmount(matchResult, userBets, playerBet);

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

        UserService.updateBalance(dispatch, matchResult, winAmount, playerBet);
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
        const choices = [BetType.rock, BetType.paper, BetType.scissors];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Get the best user choice and match result
    private static findBestUserChoice(
        userBets: IBets,
        computerChoice: BetType
    ): IUserResult {
        const winMap: Record<BetType, BetType> = {
            [BetType.rock]: BetType.scissors, // Rock beats Scissors
            [BetType.paper]: BetType.rock, // Paper beats Rock
            [BetType.scissors]: BetType.paper, // Scissors beat Paper
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

        return status.win || status.tie || status.lose;
    }
}
