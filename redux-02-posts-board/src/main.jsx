import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice.jsx";
import "./index.css";
import App from "./App.jsx";

store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
