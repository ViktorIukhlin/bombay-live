import ScissorsRockPaper, {
    dependencies as ScissorsRockPaperDependencies,
} from "./pages/ScissorsRockPaper";
import { Navigate, RouteObject } from "react-router-dom";

// If you need more information on how to create routes, follow the link below
// https://reactrouter.com/en/main/routers/create-browser-router
const routes: RouteObject[] = [
    {
        path: "/",
        element: <ScissorsRockPaper />,
        loader: ScissorsRockPaperDependencies,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

export default routes;
