import RpsService from "./rpsService";
import { AppDispatch } from "../../app/store";
import { BetType, GameStage, MatchResult } from "./enums";
import {
    updateUserBets,
    updateMatchOutcome,
    updateGameStage,
    clearRpsState,
} from "./rpsSlice";
import { decreaseBalance } from "../user/userSlice";
import UserService from "../user/userService";
import { sleep } from "../../utils/sleep";
import {
    WINNING_RATE_FOR_ONE_POSITION,
    WINNING_RATE_FOR_TWO_POSITIONS,
} from "./constants";

jest.mock("../../utils/sleep");
jest.mock("../user/userService");
jest.mock("./rpsSlice", () => ({
    updateUserBets: jest.fn(),
    updateMatchOutcome: jest.fn(),
    updateGameStage: jest.fn(),
    clearRpsState: jest.fn(),
}));
jest.mock("../user/userSlice", () => ({
    decreaseBalance: jest.fn(),
}));

describe("RpsService", () => {
    let dispatch: AppDispatch;

    beforeEach(() => {
        dispatch = jest.fn() as unknown as AppDispatch;
    });

    describe("updateUserBets", () => {
        test("#1 Given userBets, balance, minimumBet, currentBet, maximumBet; When updateUserBets is called; Then should update user bets and decrease balance", () => {
            expect.assertions(3);

            // Given
            const userBets = { [BetType.ROCK]: 100 };
            const balance = 200;
            const minimumBet = 50;
            const currentBet = 100;
            const maximumBet = 200;

            // When
            RpsService.updateUserBets(
                dispatch,
                BetType.PAPER,
                currentBet,
                minimumBet,
                maximumBet,
                userBets,
                balance
            );

            // Then
            expect(decreaseBalance).toHaveBeenCalledWith(minimumBet);
            expect(dispatch).toHaveBeenCalledWith(decreaseBalance(minimumBet));
            expect(updateUserBets).toHaveBeenCalledWith({
                [BetType.PAPER]: currentBet + minimumBet,
            });
        });

        test("#2 Given userBets, balance, minimumBet, currentBet, maximumBet; When updateUserBets is called with lov balance; Then should not update user bets", () => {
            expect.assertions(1);

            // Given
            const userBets = { [BetType.ROCK]: 100 };
            const balance = 20;
            const minimumBet = 50;
            const currentBet = 100;
            const maximumBet = 200;

            // When
            RpsService.updateUserBets(
                dispatch,
                BetType.PAPER,
                currentBet,
                minimumBet,
                maximumBet,
                userBets,
                balance
            );

            // Then
            expect(dispatch).not.toHaveBeenCalled();
        });
    });

    describe("handlePlayButtonClick", () => {
        test("#1 Given userBets, computerChoice; When handlePlayButtonClick is called; Then should handle play button click and update match outcome", async () => {
            expect.assertions(5);

            // Given
            const userBets = { [BetType.ROCK]: 100 };
            const computerChoice = BetType.SCISSORS;
            const mockSleep = sleep as jest.MockedFunction<typeof sleep>;
            const mockGetComputerChoice = jest
                .spyOn(RpsService as any, "getComputerChoice")
                .mockReturnValue(computerChoice);
            const mockFindBestUserChoice = jest
                .spyOn(RpsService as any, "findBestUserChoice")
                .mockReturnValue({
                    bestPlayerChoice: BetType.ROCK,
                    playerBet: 100,
                    matchResult: MatchResult.WIN,
                });
            const mockGetWinAmount = jest
                .spyOn(RpsService as any, "getWinAmount")
                .mockReturnValue(200);

            // When
            await RpsService.handlePlayButtonClick(dispatch, userBets);

            // Then
            expect(updateGameStage).toHaveBeenCalledWith(
                GameStage.CALCULATING_RESULTS
            );
            expect(updateMatchOutcome).toHaveBeenCalledWith({
                computerChoice,
                playerChoice: BetType.ROCK,
            });
            expect(mockSleep).toHaveBeenCalledWith(2000);
            expect(updateMatchOutcome).toHaveBeenCalledWith({
                winingPosition: BetType.ROCK,
                winAmount: 200,
                tie: false,
                gameStage: GameStage.SHOWING_RESULTS,
            });
            expect(UserService.updateBalanceAndWin).toHaveBeenCalledWith(
                dispatch,
                MatchResult.WIN,
                200,
                100
            );

            // Restore mocks
            mockGetComputerChoice.mockRestore();
            mockFindBestUserChoice.mockRestore();
            mockGetWinAmount.mockRestore();
        });
    });

    describe("clearRpsState", () => {
        test("#1 When clearRpsState is called; Then should clear the RPS state", () => {
            expect.assertions(1);

            // When
            RpsService.clearRpsState(dispatch);

            // Then
            expect(clearRpsState).toHaveBeenCalled();
        });
    });

    describe("formatNumber", () => {
        test("#1 Should format numbers correctly", () => {
            expect.assertions(3);

            expect(RpsService.formatNumber(500)).toBe(500);
            expect(RpsService.formatNumber(1500)).toBe("1.5k");
            expect(RpsService.formatNumber(2000)).toBe("2.0k");
        });
    });

    describe("findBestUserChoice", () => {
        test("#1 Given userBets,computerChoice; When findBestUserChoice is called; Then should find the best user choice to win", () => {
            expect.assertions(2);

            // Given
            const userBets = { [BetType.ROCK]: 100, [BetType.PAPER]: 50 };
            const computerChoice = BetType.ROCK;

            // When
            const result = RpsService["findBestUserChoice"](
                userBets,
                computerChoice
            );

            // Then
            expect(result.matchResult).toBe(MatchResult.WIN);
            expect(result.bestPlayerChoice).toBe(BetType.PAPER);
        });
    });

    describe("getWinAmount", () => {
        test("#1 Given userBets with one bet; When getWinAmount is called; Then should calculate win amount correctly", () => {
            expect.assertions(1);

            // Given
            const userBets = { [BetType.ROCK]: 100 };

            // When
            const result = RpsService["getWinAmount"](
                MatchResult.WIN,
                userBets,
                100
            );

            // Then
            expect(result).toBe(100 * WINNING_RATE_FOR_ONE_POSITION);
        });

        test("#2 Given userBets with two bets; When getWinAmount is called; Then should calculate win amount correctly", () => {
            expect.assertions(1);

            // Given
            const userBets = { [BetType.ROCK]: 100, [BetType.PAPER]: 100 };

            // When
            const result = RpsService["getWinAmount"](
                MatchResult.WIN,
                userBets,
                100
            );

            // Then
            expect(result).toBe(100 * WINNING_RATE_FOR_TWO_POSITIONS);
        });

        test("#3 Given userBets; When getWinAmount is called with MatchResult.LOSE; Then should return undefined", () => {
            expect.assertions(1);
            // Given
            const userBets = { [BetType.ROCK]: 100 };

            // when
            const result = RpsService["getWinAmount"](
                MatchResult.LOSE,
                userBets,
                100
            );

            // Then
            expect(result).toBeUndefined();
        });
    });
});
