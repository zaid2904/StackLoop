import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";
import { AuthStoreProvider } from "./store/authStore";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthStoreProvider>
			<App />
		</AuthStoreProvider>
	</StrictMode>,
);
