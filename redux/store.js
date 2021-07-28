import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { logger } from "redux-logger";

export const store = createStore(reducer, applyMiddleware(logger));

export const persistor = persistStore(store);

export default { store, persistor };
