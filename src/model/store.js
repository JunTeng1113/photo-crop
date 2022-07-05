import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer from "./reducer.js";

const allReducers = combineReducers({
    reducer: reducer,
});
    
const store = configureStore({ 
    reducer: allReducers, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }), //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
}); 

export { store };