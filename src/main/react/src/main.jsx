import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/index.jsx";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
);