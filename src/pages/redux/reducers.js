import { combineReducers } from "redux";
import tickets from "./slices/ticketsSlice.js";
 import comments from "./slices/commentSlice.js";


const reducers = combineReducers({
  tickets,
  comments,
});

export default reducers;
