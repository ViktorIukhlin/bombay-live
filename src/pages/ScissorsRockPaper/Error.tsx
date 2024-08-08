import { useRouteError } from "react-router-dom";

const Error = (): JSX.Element => {
    const error = useRouteError() as { message: string };
    console.log("loaderData", error);

    return (
        <div>
            <div>{error.message}</div>
        </div>
    );
};
export default Error;
