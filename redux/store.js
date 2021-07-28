import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const store = createStore(reducer);

export const persistor = persistStore(store);

export default { store, persistor };
