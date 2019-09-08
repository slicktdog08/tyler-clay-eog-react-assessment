import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import dashboardStats from './reducers/DashboardStats'
import dataOptions from './reducers/dataOptions'
import subscriptionData from './reducers/subscriptionData'

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    dashboardStats: dashboardStats,
    dataOptions,
    subscriptionData
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
