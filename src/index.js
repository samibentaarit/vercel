import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './App.scss'
import ScrollToTop from "./ScrollToTop";
import { Provider } from "react-redux";
import { persistor, store } from "./pages/redux/store";
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.Fragment>

        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ScrollToTop />
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>

    </React.Fragment>
);

