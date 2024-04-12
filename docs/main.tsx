import "@d/assets/common.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GlobalContext, useGlobalValues } from "./config/context";
import Router from "./router";

const App = () => {
	const global = useGlobalValues();

	return (
		<React.StrictMode>
			<GlobalContext.Provider value={global}>
				<RouterProvider router={Router}></RouterProvider>
			</GlobalContext.Provider>
		</React.StrictMode>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<App />
);
