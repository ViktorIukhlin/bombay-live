import RockPaperScissors from "./pages/RockPaperScissors";
import { Navigate, RouteObject } from "react-router-dom";

// If you need more information on how to create routes, follow the link below
// https://reactrouter.com/en/main/routers/create-browser-router
const routes: RouteObject[] = [
    {
        path: "/",
        element: <RockPaperScissors />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

export default routes;
