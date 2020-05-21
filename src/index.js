import React from "react";
import ReactDOM from "react-dom";
import Platform from "./Platform";
import * as serviceWorker from "./serviceWorker";
import dotenv from "dotenv";

dotenv.config();

ReactDOM.render(<Platform />, document.getElementById("root"));

serviceWorker.unregister();
