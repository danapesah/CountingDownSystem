
import {combineReducers } from "redux"
import MessageWindowReducer from "./MessageWindowReducer.js"
import MainWindowReducers from "./MainWindowReducers";
import FieldStatusReducers from "./FieldStatusReducers"
import OperationWindowReducers from "./OperationWindowReducers"
import CountDownWindowReducers from "./CountDownWindowReducers"

const rootReducer = combineReducers({
  MessageWindowReducer: MessageWindowReducer,
  OperationWindowReducers:OperationWindowReducers,
  FieldStatusReducers:FieldStatusReducers,
  CountDownWindowReducers: CountDownWindowReducers,
  MainWindowReducers:  MainWindowReducers,
  });

  
export default rootReducer;