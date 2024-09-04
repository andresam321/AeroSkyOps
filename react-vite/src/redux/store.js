import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
  
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import parkingSpotReducer from "./parking_spot";
import aircraftReducer from "./aircraft";
import airportAreasReducer from "./airport_area";
import ownerReducer from "./owner";
import fuelingReducer from "./fueling";
import fuelPriceReducer from "./price";
import flightAwareReducer from "./flightaware";

const rootReducer = combineReducers({
  session: sessionReducer,
  parkingSpotReducer: parkingSpotReducer,
  aircraftReducer: aircraftReducer,
  airportAreasReducer:airportAreasReducer,
  ownerReducer:ownerReducer,
  fuelingReducer:fuelingReducer,
  fuelPriceReducer:fuelPriceReducer,
  flightAwareReducer:flightAwareReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
