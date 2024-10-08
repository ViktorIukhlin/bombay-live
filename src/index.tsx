import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./app/store";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createHashRouter(routes);

root.render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
