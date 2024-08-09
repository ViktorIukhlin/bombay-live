import RockPaperScissors, {
    dependencies as RockPaperScissorsDependencies,
} from "./pages/RockPaperScissors";
import { Navigate, RouteObject } from "react-router-dom";

// If you need more information on how to create routes, follow the link below
// https://reactrouter.com/en/main/routers/create-browser-router
const routes: RouteObject[] = [
    {
        path: "/",
        element: <RockPaperScissors />,
        loader: RockPaperScissorsDependencies,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

export default routes;
