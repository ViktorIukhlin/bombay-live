import { useLoaderData, defer, Await } from "react-router-dom";
import { getUserData } from "../../lib/api";
import { Suspense } from "react";

const ScissorsRockPaper = (): JSX.Element => {
    const loaderData = useLoaderData() as { balance: number };

    return (
        <div>
            <div>ScissorsRockPaper</div>
            <Suspense fallback={<p> Loading ....</p>}>
                <Await resolve={loaderData.balance} errorElement={<p>s</p>}>
                    {({ user }) => <div>{user}</div>}
                </Await>
            </Suspense>
        </div>
    );
};
export default ScissorsRockPaper;

export function dependencies() {
    return defer({ user: getUserData() });
}
