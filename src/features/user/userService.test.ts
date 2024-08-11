import UserService from "./userService";
import { getUserData } from "../../lib/api";
import { increaseBalance, setUserData, increaseTotalWins } from "./userSlice";
import { MatchResult } from "../rps/enums";
import { AppDispatch } from "../../app/store";

jest.mock("../../lib/api", () => ({
    getUserData: jest.fn(),
}));

jest.mock("./userSlice", () => ({
    increaseBalance: jest.fn(),
    setUserData: jest.fn(),
    increaseTotalWins: jest.fn(),
}));

describe("UserService", () => {
    let dispatch: AppDispatch;

    beforeEach(() => {
        dispatch = jest.fn() as unknown as AppDispatch;
    });

    describe("loadUserData", () => {
        test("#1 Given mockUserData; When loadUserData is called; Then should load user data and dispatch setUserData", async () => {
            expect.assertions(2);

            // Given
            const mockUserData = { balance: 1000, totalWins: 5 };
            (getUserData as jest.Mock).mockResolvedValue(mockUserData);

            // When
            await UserService.loadUserData(dispatch);

            // Then
            expect(getUserData).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(setUserData(mockUserData));
        });
    });

    describe("updateBalanceAndWin", () => {
        test("#2 Given winAmount and playerBet; When updateBalanceAndWin is called; Then should dispatch increaseBalance and increaseTotalWins", () => {
            expect.assertions(2);

            // Given
            const winAmount = 200;
            const playerBet = 100;

            // When
            UserService.updateBalanceAndWin(
                dispatch,
                MatchResult.WIN,
                winAmount,
                playerBet
            );

            // Then
            expect(dispatch).toHaveBeenCalledWith(increaseBalance(winAmount));
            expect(dispatch).toHaveBeenCalledWith(increaseTotalWins());
        });

        test("#3 Given winAmount and playerBet; When updateBalanceAndWin is called with MatchResult.TIE; Then should return playerBet", () => {
            expect.assertions(1);

            // Given
            const winAmount = undefined;
            const playerBet = 100;

            // When
            UserService.updateBalanceAndWin(
                dispatch,
                MatchResult.TIE,
                winAmount,
                playerBet
            );

            // Then
            expect(dispatch).toHaveBeenCalledWith(increaseBalance(playerBet));
        });

        test("#4 Given winAmount and playerBet; When updateBalanceAndWin is called with MatchResult.LOSE; Then should not dispatch increaseBalance or increaseTotalWins", () => {
            expect.assertions(2);

            // Given
            const winAmount = undefined;
            const playerBet = 100;

            // When
            UserService.updateBalanceAndWin(
                dispatch,
                MatchResult.LOSE,
                winAmount,
                playerBet
            );

            // Then
            expect(dispatch).not.toHaveBeenCalledWith(
                increaseBalance(playerBet)
            );
            expect(dispatch).not.toHaveBeenCalledWith(increaseTotalWins());
        });
    });
});
