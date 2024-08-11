import { IUserState } from "../features/user/interfaces";
import { START_BALANCE } from "./constants";

export async function getUserData(): Promise<IUserState> {
    try {
        return new Promise(async (resolve) => {
            resolve({
                balance: START_BALANCE,
                totalWins: 0,
            });
        });
    } catch (error) {
        throw new Error("Error to get user data.");
    }
}
