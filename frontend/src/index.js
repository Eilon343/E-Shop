import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  React,
  ReactDOM,
  App,
  axios,
  HelmetProvider,
  StoreProvider,
} from './Imports';
axios.defaults.baseURL = 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
);
