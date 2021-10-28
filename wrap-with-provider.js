import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/configureStore";

// eslint-disable-next-line react/display-name, react/prop-types

const { store, persistor } = configureStore({});

const App = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{element}</PersistGate>
    </Provider>
  );
};

export default App;
