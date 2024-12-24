import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Store/store";  // No curly braces here
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Use BrowserRouter here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router> {/* Wrap App in Router here */}
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);
