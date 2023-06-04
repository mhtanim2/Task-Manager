
/* import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'; */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App'; /*
import ColorModeSwitcher from './ColorModeSwitcher'; */
import "./assets/css/animate.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

