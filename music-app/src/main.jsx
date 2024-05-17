import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './router/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from "react-redux";
import { store } from './redux/store.js';
import theme from "./theme/index.js";
import "./index.css";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <ChakraProvider theme={theme}
          toastOptions={{
            defaultOptions: {
              position: "top",
              duration: 3000,
              variant: "subtle",
              containerStyle: { fontSize: 14 },
            },
          }}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>

    </Provider>

  </React.StrictMode>,
)
