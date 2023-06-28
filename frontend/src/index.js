import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  React,
  ReactDOM,
  App,
  axios,
  HelmetProvider,
  StoreProvider,
} from "./Imports";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
);
