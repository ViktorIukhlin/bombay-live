import { sleep } from "../utils/sleep";

export async function getUserData(): Promise<{}> {
    try {
        return new Promise(async (resolve) => {
            await sleep(1000);

            const fakeData = {
                balance: 5000,
            };

            resolve(fakeData);
        });
    } catch (error) {
        return new Error("Error to get user data.");
    }
}
