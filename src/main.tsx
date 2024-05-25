// import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/reset.scss";
import "@/styles/common.scss";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import "@/assets/iconfont/iconfont.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	//	<React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
